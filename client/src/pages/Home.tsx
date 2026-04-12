import Button from "@/components/utils/Button";
import { REGION_STORAGE_KEY } from "@/config/config";
import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom";


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
                    {user?.name && <p className="text-3xl font-bold">Bienvenido <span className="text-[#C53F56]">{user.name}</span></p>}
                </div>
                <div>
                    <Button url={user ? '/new/create-blog' : '#'} text="Crear Blog" />
                </div>
            </nav>
        </>
    )
}
