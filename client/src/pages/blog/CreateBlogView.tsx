import { createBlog } from "@/api/BlogAPI";
import CreateBlogForm from "./CreateBlogForm";
import { useNavigate } from "react-router-dom";
import TagBlog from "@/components/blog/TagBlog";
import TeamBlog from "@/components/blog/TeamBlog";
import { useAppStore } from "@/stores/useAppStore";
import TitleBlog from "@/components/blog/TitleBlog";
import DescriptionBlog from "@/components/blog/DescriptionBlog";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CreateModalBlock from "@/components/Modals/CreateModalBlock";

export default function CreateBlogView() {
    const navigate = useNavigate();
    
    const blogDraft = useAppStore(state => state.blogDraft);
    const blocks = useAppStore(state => state.blocks);
    const reg = useAppStore(state => state.regSelect);
    
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn : createBlog,
        onSuccess : () => { 
            queryClient.invalidateQueries({ queryKey : ['blogs']});
            navigate('/');
        },
        onError : (error) => {
            console.error('Error al crear el blog:' + error);
        }
    });

    const handlePublish = (published : boolean) => {
        const headingBlock = blocks.find(block => block.type === 'heading');
        const formData = {
            title : headingBlock?.value || 'Mi primer blog',
            description : blogDraft.description ?? '',
            published,
            reg : reg.value,
            post : {
                blocks : blocks.map(block => ({
                    type : block.type,
                    value : block.value,
                    order : block.order
                })),
                tags : [] as string[]
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
                            <TagBlog tags={["Tag 1", "Tag 2", "Tag 3"]} />
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
