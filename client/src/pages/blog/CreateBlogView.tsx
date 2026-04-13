import TagBlog from "@/components/blog/TagBlog";
import TeamBlog from "@/components/blog/TeamBlog";
import TitleBlog from "@/components/blog/TitleBlog";
import { useNavigate } from "react-router-dom"
import CreateBlogForm from "./CreateBlogForm";
import { useAppStore } from "@/stores/useAppStore";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function CreateBlogView() {

    const titleBlock = useAppStore(state => state.blocks.find(block => block.type === 'heading'));

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <main>
            <button onClick={handleBack} className="text-sm text-gray-500 hover:text-[#C53F56] transition-colors mb-4 p-5"><ArrowLeftIcon /> Volver</button>
            <div className='max-w-5xl mx-auto pt-5'>
                <h2 className='text-4xl font-bold text-left'>Crea tu <span className='text-[#1f387f]'>propio blog</span></h2>
                <section className="grid grid-cols-12 mt-5 gap-10">
                    <article className="col-span-9">
                        <CreateBlogForm />
                    </article>
                    <article className="col-span-3">
                        <div className="flex flex-col justify-start">
                            <TitleBlog titulo={titleBlock?.value || 'Hola! Estoy haciendo un blog'} />
                            <TeamBlog team={["Adrián Iglesias", "Anxo Rodriguez", "Claudia Casal"]} />
                            <TagBlog tags={["Tag 1", "Tag 2", "Tag 3"]} />
                            <div>
                                <button className="bg-[#1f387f] text-white px-4 py-2 rounded-full mt-5 hover:bg-[#3764e2] w-full transition-colors">Publicar</button>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </main>
    )
}
