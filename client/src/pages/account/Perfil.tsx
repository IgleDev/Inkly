import { getUserByName } from "@/api/AccountAPI"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { useReg } from "@/hooks/useReg";
import BlogResumeCard from "@/components/blog/BlogResumeCard";
import type { iBlogPresentation } from "@/types/types";

export default function Perfil() {
  const { data: sessionUser } = useAuth();
  const { name } = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(name!);
  const { data: profileUser, isLoading } = useQuery({
    queryKey: ['user', decodedName],
    queryFn: () => getUserByName(decodedName),
    enabled: !!decodedName
  });

  const { user, blogs } = profileUser || {};

  const reg = useReg(user?.reg);

  const isOwner = sessionUser?.name === user?.name;

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="flex items-center gap-3 text-6xl font-bold text-[#C53F56]">
        <span className="flex items-center">{user?.name} {user?.secondName}</span>
        {reg.flag && (<img src={reg.flag} alt="Flag" className="w-14 h-14" />)}
      </h1>
      {/* Añadir descripción de usuario */}
      <div className="flex mt-5 justify-start w-full">
        {blogs?.length ? (
          <div className="flex flex-row mt-5 flex-wrap">
            <h2 className="w-full my-10 text-3xl font-bold text-[#C53F56]">
              Blogs Subidos
            </h2>
          {blogs.map((blog, index) => (
            <BlogResumeCard key={index} blog={blog as iBlogPresentation} isOwner={isOwner} />
          ))}
      </div>
      ) : (
        <p>No hay blogs disponibles.</p>
      )}
      </div>
    </div>
  )
}
