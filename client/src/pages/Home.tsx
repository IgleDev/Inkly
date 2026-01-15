import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom";
import RegView from "./RegView";


export default function Home() {
    const { data : user, isError, isLoading : authLoading } = useAuth();

    if(authLoading) return 'Cargando Usuario...'

    if(isError) {
        return <Navigate to="/auth/login" />
    } 

    return (
        <>
            { user ? (
                <p>{user.name}</p>
            ) : (
                <RegView />
            )}
        </>
    )
}
