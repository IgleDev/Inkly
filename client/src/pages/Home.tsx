import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import countries from '@/json/countries.json';
import Button from "@/components/utils/Button";
import { useQuery } from "@tanstack/react-query";
import type { iBlogAccount } from "@/types/types";
import { useAppStore } from "@/stores/useAppStore";
import { getAllBlogs, getBlogsByTags } from "@/api/BlogAPI";
import BlogResumeCard from "@/components/blog/BlogResumeCard";
import { FolderPlusIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";

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
            <nav className="flex justify-between pt-10 p-4">
                <div>
                    {user?.name && <p className="text-3xl font-bold">Bienvenido <span className="text-[#C53F56]">{user.name} </span>👋</p>}
                </div>
                <div className="flex">
                    <Button url={user ? `/perfil/${user._id}` : '#'}>
                        <UserIcon className="w-5 h-5 inline mr-2"/> Ver Perfil 
                    </Button>
                    <Button url={user ? '/new/create-blog' : '#'}>
                        <FolderPlusIcon className="w-5 h-5 inline mr-2"/> Crear Blog
                    </Button>
                </div>
            </nav>
            <main>
                <h1 className="text-center text-4xl my-5 font-bold">Los post <span className="text-[#C53F56]">más populares</span> de <span className="text-[#C53F56] uppercase">{activeRegion.name}</span></h1>
                <div className="flex flex-col justify-center items-center mt-10">
                    <div>
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
                    <div className="flex items-center w-2/6 mt-10 gap-2">
                        <input type="text" placeholder="Filtrar por temas..." className="flex-1 p-3 rounded-full border border-[#C53F56] outline-none" value={tag} onChange={(e) => setTag(e.target.value)}/>
                        <button onClick={() => setSearch(tag)} className="p-3 rounded-full border bg-[#C53F56] text-white flex items-center justify-center"><MagnifyingGlassIcon className="w-6 h-6" /></button>
                    </div>
                </div>
                <section className="flex flex-row justify-start w-full p-5">
                    {blogs?.blogs?.map((blog: iBlogAccount, index : number) => (
                        <BlogResumeCard key={index} blog={blog} />
                    ))}
                </section>
            </main>
        </>
    )
}
