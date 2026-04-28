import { useReg } from "@/hooks/useReg";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "react-router-dom";
import { getUserById } from "@/api/AccountAPI";
import { useQuery } from "@tanstack/react-query";
import type { iBlogAccount } from "@/types/types";
import BlogResumeCard from "@/components/blog/BlogResumeCard";

export default function Perfil() {
  const { data: sessionUser } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { data: profileUser, isLoading } = useQuery({
    queryKey: ['user', 'blogs', id],
    queryFn: () => getUserById(id!),
    enabled: !!id
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
            <BlogResumeCard key={index} blog={blog as iBlogAccount} isOwner={isOwner} user={user} profileId={id}/>
          ))}
      </div>
      ) : (
        <p>No hay blogs disponibles.</p>
      )}
      </div>
    </div>
  )
}
