import { useAuth } from "@/hooks/useAuth"
import { getAllBlogs } from "@/api/BlogAPI";
import { Navigate } from "react-router-dom";
import Button from "@/components/utils/Button";
import { useQuery } from "@tanstack/react-query";
import type { iBlogPresentation } from "@/types/types";
import BlogResumeCard from "@/components/blog/BlogResumeCard";
import countries from '@/json/countries.json'
import { useAppStore } from "@/stores/useAppStore";

export default function Home() {
    const { data : user, isError, isLoading : authLoading } = useAuth();

    const regSelect = useAppStore(state => state.regSelect);
    const regFilter = useAppStore(state => state.regFilter);
    const updateRegFilter = useAppStore(state => state.updateRegFilter);
    const activeRegion = regFilter.value ? regFilter : regSelect;
    console.log(activeRegion)

    const { data : blogs } = useQuery({
        queryKey: ['blogs', activeRegion.value],
        queryFn : () => getAllBlogs(activeRegion.value),
        enabled : !!activeRegion.value
    });

    if(authLoading) return 'Cargando Usuario...'
    
    if(isError) {
        return <Navigate to="/auth/login" />
    } 
    
    if(!activeRegion.value) { return <Navigate to="/select-region" /> }

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
                <h1 className="text-center text-4xl my-5 font-bold">Los post <span className="text-[#C53F56]">más populares</span> de <span className="text-[#C53F56] uppercase">{activeRegion.name}</span></h1>
                <div className="flex justify-center items-center mt-10">
                    <label className="text-xl font-bold mx-2" htmlFor="">Estas filtrando blogs sobre</label>
                    <select value={regFilter.value || regSelect.value} 
                        onChange={(e) => {
                            const selected = countries.find(c => c.value === e.target.value);
                            if (selected) { updateRegFilter(selected); }
                        }}
                        className="p-2 bg-transparent border-2 border-[#C53F56] rounded-xl">
                        {countries.map((reg) => (
                            <option key={reg.name} value={reg.value}>{reg.name}</option>
                        ))}
                    </select>
                </div>
                <section className="flex flex-row justify-start w-full p-5">
                    {blogs?.blogs?.map((blog: iBlogPresentation, index : number) => (
                        <BlogResumeCard key={index} blog={blog} />
                    ))}
                </section>
            </main>
        </>
    )
}
