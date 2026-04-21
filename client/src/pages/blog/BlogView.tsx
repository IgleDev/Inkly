import { getBlogById } from "@/api/BlogAPI"
import BlogContent from "@/components/blog/BlogContent";
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom";


export default function BlogView() {
    const { id } = useParams();
    
    const { data, isLoading, error } = useQuery({
        queryKey : ['blog', id],
        queryFn : () => {
            return getBlogById(id as string);
        },
        enabled : !!id
    })
    
    if(!id) return  <Navigate to="/" />
    if (isLoading) return <div>Cargando...</div>;
    if (error) return <Navigate to="/" />
    if (!data) return null;
    
    return (
      <div>
        <BlogContent blocks={data.blocks} />
      </div>
    )
}
