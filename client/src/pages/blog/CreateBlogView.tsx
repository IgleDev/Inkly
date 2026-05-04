import { uploadImage } from "@/api/UploadAPI";
import CreateBlogForm from "./CreateBlogForm";
import TagBlog from "@/components/blog/TagBlog";
import TeamBlog from "@/components/blog/TeamBlog";
import { useAppStore } from "@/stores/useAppStore";
import TitleBlog from "@/components/blog/TitleBlog";
import { createBlog, getBlogById, updateBlog } from "@/api/BlogAPI";
import { useNavigate, useParams } from "react-router-dom";
import DescriptionBlog from "@/components/blog/DescriptionBlog";
import CreateModalBlock from "@/components/Modals/CreateModalBlock";
import { BLOCK_TYPES, type iBlockSelect } from "@/types/helperTypes";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from "react";

export default function CreateBlogView() {
    const navigate = useNavigate();
    const { id } = useParams(); 

    const tags = useAppStore(state => state.tags);
    const blocks = useAppStore(state => state.blocks);
    const reg = useAppStore(state => state.regSelect);
    const setTags = useAppStore(state => state.setTags);
    const blogDraft = useAppStore(state => state.blogDraft);
    const setBlocks = useAppStore(state => state.setBlocks);
    const clearFunction = useAppStore(state => state.clearFunction);
    const updateDescription = useAppStore(state => state.updateDescription);
    
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey : ['blogToEdit', id],
        queryFn : () => getBlogById(id!),
        enabled : !!id
    });
    const isEdit = !!id;

    useEffect(() => {
        if (!isEdit) clearFunction();
    }, [isEdit]);

    useEffect(() => {
        if (data && isEdit) {
            setBlocks(data.blocks);
            updateDescription(data.blog?.description as string);
            setTags(data.blog?.tags || []);
        }
    }, [data]);

    const { mutate, isPending } = useMutation({
        mutationFn : isEdit ? (formData) => updateBlog(id!, formData) : createBlog,
        onSuccess : () => { 
            queryClient.invalidateQueries({ queryKey : ['blogs']});
            clearFunction();
            navigate('/');
        },
        onError : (error) => {
            console.error('Error al crear el blog:' + error);
        }
    });

    const handlePublish = async (published : boolean) => {
        const headingBlock = blocks.find(block => block.type === 'heading');
        const processedBlocks = await Promise.all(
        blocks.map(async (block: iBlockSelect) => {
            if ((block.type === BLOCK_TYPES.IMAGE || block.type === BLOCK_TYPES.VIDEO) && block.file) {
            const url = await uploadImage(block.file);
            return { ...block, value: url };
            }
            return block;
        }));
        const formData = {
            title : headingBlock?.value || 'Mi primer blog',
            description : blogDraft.description ?? '',
            tags,
            published,
            reg : reg.value,
            post : {
                blocks : processedBlocks.map(block => ({
                    type : block.type,
                    value : block.value,
                    description : block.description || '',
                    order : block.order
                })),
            }
        };
        mutate(formData);
    }

    return (
        <main>
            <CreateModalBlock />
            <div className='max-w-5xl mx-auto pt-5'>
                <h2 className='text-4xl font-bold text-left'>Crea tu <span className='text-[#1f387f]'>propio blog</span></h2>
                <section className="grid grid-cols-12 mt-5 gap-10">
                    <article className="col-span-9">
                        <CreateBlogForm />
                    </article>
                    <article className="col-span-3">
                        <div className="flex flex-col justify-start">
                            <TitleBlog />
                            <DescriptionBlog />
                            <TeamBlog team={["Adrián Iglesias", "Anxo Rodriguez", "Claudia Casal"]} />
                            <TagBlog />
                            <div className="flex gap-4">
                                <button onClick={() => handlePublish(true)} disabled={isPending} 
                                    className="bg-[#1f387f] text-white px-4 py-2 rounded-full mt-5 hover:bg-[#3764e2] w-full transition-colors">
                                    {isPending ? 'Publicando...' : 'Publicar'}
                                </button>
                                <button onClick={() => handlePublish(false)} disabled={isPending} 
                                    className="bg-[#1f387f] text-white px-4 py-2 rounded-full mt-5 hover:bg-[#3764e2] w-full transition-colors">
                                    {isPending ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </main>
    )
}
