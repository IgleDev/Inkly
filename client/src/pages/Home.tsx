import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom";


export default function Home() {
    const { data : user, isError, isLoading : authLoading } = useAuth();

    if(authLoading) return 'Cargando Usuario...'

    if(isError) {
        return <Navigate to="/auth/login" />
    } 

    if(user) return (
        <div>{user.name}</div>
    )
}
