import { getUser } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
    const token = localStorage.getItem('AUTH_TOKEN');
    const { data, isError, isLoading } = useQuery({
        queryKey : ['user'],
        queryFn : getUser,
        enabled : !!token,
        retry : 1,
        refetchOnWindowFocus : false    // No realiza el refetch al volver a la pestaña
    })
    return { data, isError, isLoading }
}