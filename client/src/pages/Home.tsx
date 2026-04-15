import { useAuth } from "@/hooks/useAuth"
import { getAllBlogs } from "@/api/BlogAPI";
import { Navigate } from "react-router-dom";
import Button from "@/components/utils/Button";
import { useQuery } from "@tanstack/react-query";
import { REGION_STORAGE_KEY } from "@/config/config";
import type { iBlogPresentation } from "@/types/types";
import BlogResumeCard from "@/components/blog/BlogResumeCard";
import { useReg } from "@/hooks/useReg";

export default function Home() {
    const { data : user, isError, isLoading : authLoading } = useAuth();
    const { value, name } = useReg();

    const hasRegion = !!localStorage.getItem(REGION_STORAGE_KEY);

    const { data : blogs } = useQuery({
        queryKey: ['blogs'],
        queryFn : () => getAllBlogs(value),
        enabled : hasRegion
    });

    if(authLoading) return 'Cargando Usuario...'
    
    if(isError) {
        return <Navigate to="/auth/login" />
    } 
    
    if(!hasRegion) { return <Navigate to="/select-region" /> }
    

    return (
        <>  
            <nav className="flex justify-between pt-10 p-4">
                <div>
                    {user?.name && <p className="text-3xl font-bold">Bienvenido <span className="text-[#C53F56]">{user.name}</span></p>}
                </div>
                <div>
                    <Button url={user ? '/new/create-blog' : '#'} text="Crear Blog" />
                </div>
            </nav>
            <main>
                <h1 className="text-center text-4xl my-5 font-bold">Los post <span className="text-[#C53F56]">más populares</span> de <span className="text-[#C53F56] uppercase">{name}</span></h1>
                <section className="flex flex-row justify-start w-full p-5">
                    {blogs?.blogs?.map((blog: iBlogPresentation, index : number) => (
                        <BlogResumeCard key={index} blog={blog} />
                    ))}
                </section>
            </main>
        </>
    )
}
