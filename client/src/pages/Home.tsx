import { REGION_STORAGE_KEY } from "@/config/config";
import { useAuth } from "@/hooks/useAuth"
import { Link, Navigate } from "react-router-dom";


export default function Home() {
    const { data : user, isError, isLoading : authLoading } = useAuth();

    const hasRegion = !!localStorage.getItem(REGION_STORAGE_KEY);
    if(authLoading) return 'Cargando Usuario...'

    if(isError) {
        return <Navigate to="/auth/login" />
    } 

    if(!hasRegion) { return <Navigate to="/select-region" /> }

    return (
        <>  
            <nav className="flex justify-between pt-10 p-4">
                <div>
                    <p className="text-2xl font-bold">{user?.name}</p>
                </div>
                <div>
                    <Link to={user ? '/' : '#'}  className="`mt-2 px-10 py-5 rounded-full font-extrabold text-lg uppercase 
                        tracking-wide transition-all duration-150 bg-white text-black shadow-[0_6px_0_0_#d3d3d3] 
                        hover:translate-y-0.5 hover:shadow-[0_4px_0_0_#d4d4d4] active:translate-y-1 
                        active:shadow-[0_2px_0_0_#d4d4d4]">Crear Blog
                    </Link>
                </div>
            </nav>
        </>
    )
}
