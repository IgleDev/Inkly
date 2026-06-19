import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import countries from '@/json/countries.json';
import { useQuery } from "@tanstack/react-query";
import type { iBlogAccount } from "@/types/types";
import { useAppStore } from "@/stores/useAppStore";
import { getAllBlogs, getBlogsByTags } from "@/api/BlogAPI";
import BlogResumeCard from "@/components/blog/BlogResumeCard";
import LinkCreateModal from "@/components/Modals/LinkCreateModal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LinkViewProfile from "@/components/Modals/LinkViewProfile";
export default function Home() {
    const { data : user, isError, isLoading : authLoading } = useAuth();
    const [tag, setTag] = useState('');
    const [search, setSearch] = useState('');
    const regSelect = useAppStore(state => state.regSelect);
    const regFilter = useAppStore(state => state.regFilter);
    const updateRegFilter = useAppStore(state => state.updateRegFilter);
    const activeRegion = regFilter.value ? regFilter : regSelect;
    const { data : blogs } = useQuery({
        queryKey: ['blogs', activeRegion.value, search],
        queryFn : () => {
            if(search) {
                return getBlogsByTags(activeRegion.value!, search);
            }
            return getAllBlogs(activeRegion.value!);
        },
        enabled : !!activeRegion.value
    });
    if(authLoading) return 'Cargando Usuario...'
    
    if(isError) {
        return <Navigate to="/auth/login" />
    } 
    
    if(!activeRegion.value) { return <Navigate to="/select-region" /> }
    return (
        <>  
            <nav className="flex justify-between pt-6 sm:pt-10 p-4">
                <div>
                    {user?.name && <p className="text-xl sm:text-3xl font-bold">Bienvenido <span className="text-[#C53F56]">{user.name} </span>👋</p>}
                </div>
                <div className="flex">
                    <LinkViewProfile user={user} />
                    <LinkCreateModal user={user} />
                </div>
            </nav>
            <main className="px-4 sm:px-0">
                <h1 className="text-center text-2xl sm:text-4xl my-5 font-bold">Los post <span className="text-[#C53F56]">más populares</span> de <span className="text-[#C53F56] uppercase">{activeRegion.name}</span></h1>
                <div className="flex flex-col justify-center items-center mt-6 sm:mt-10">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 text-center sm:text-left">
                        <label className="text-base sm:text-xl font-bold mx-2" htmlFor="">Estas filtrando blogs sobre</label>
                        <select value={regFilter.value || regSelect.value} 
                            onChange={(e) => {
                                const selected = countries.find(c => c.value === e.target.value);
                                if (selected) { updateRegFilter(selected); }
                            }}
                            className="p-2 bg-transparent border-2 border-[#C53F56] rounded-xl text-sm sm:text-base">
                            {countries.map((reg) => (
                                <option key={reg.name} value={reg.value}>{reg.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center w-full sm:w-2/6 mt-6 sm:mt-10 gap-2">
                        <input type="text" placeholder="Filtrar por temas..." className="flex-1 p-3 rounded-full border border-[#C53F56] outline-none text-sm sm:text-base" value={tag} onChange={(e) => setTag(e.target.value)}/>
                        <button onClick={() => setSearch(tag)} className="p-3 rounded-full border bg-[#C53F56] text-white flex items-center justify-center"><MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6" /></button>
                    </div>
                </div>
                <section className="flex flex-row flex-wrap justify-start w-full p-3 sm:p-5">
                    {blogs?.blogs?.map((blog: iBlogAccount, index : number) => (
                        <BlogResumeCard key={index} blog={blog} />
                    ))}
                </section>
            </main>
        </>
    )
}