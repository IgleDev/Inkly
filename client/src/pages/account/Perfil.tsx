import { useReg } from "@/hooks/useReg";
import { useAuth } from "@/hooks/useAuth";
import { getBlogsTeam } from "@/api/BlogAPI";
import { getUserById } from "@/api/AccountAPI";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import type { iBlogAccount, ITeamBlog } from "@/types/types";
import BlogResumeCard from "@/components/blog/BlogResumeCard";

export default function Perfil() {
  const { data: sessionUser } = useAuth();
  const { id } = useParams<{ id: string }>();

  const { data: profileUser, isLoading } = useQuery({
    queryKey: ['user', 'blogs', id],
    queryFn: () => getUserById(id!),
    enabled: !!id
  });


  const { data: teamBlogs } = useQuery<ITeamBlog[]>({
    queryKey: ['user', 'blogs', 'team', id],
    queryFn: () => getBlogsTeam(),
  });

  const { user, blogs } = profileUser || {};
  const reg = useReg(user?.reg);
  const isOwner = sessionUser?.name === user?.name;
  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="my-5 px-4 sm:px-0">
      <div className="w-full flex justify-end">
        <Link to={`/perfil-account/${user?._id}`}>
          <Cog6ToothIcon className="text-gray-500 w-7 h-7 sm:w-10 sm:h-10" />
        </Link>
      </div>
      <div className="flex items-center mb-6 sm:mb-10">
        <img src={user?.photoProfile} alt={`Photo of ${user?.name}`} className="w-12 h-12 sm:w-16 sm:h-16 mr-3 sm:mr-5 rounded-full"/> 
        <h1 className="flex items-center gap-2 sm:gap-3 text-3xl sm:text-6xl font-bold text-[#C53F56]">
          <span className="flex items-center">
            {user?.name} {user?.secondName}
          </span>
          {reg.flag && (<img src={reg.flag} alt="Flag" className="w-8 h-8 sm:w-14 sm:h-14" />)}
        </h1>
      </div>
      <blockquote className="text-gray-500 mt-5 border-l-4 border-gray-300 pl-4 italic text-sm sm:text-base">{user?.description}</blockquote>
      <div className="flex mt-5 justify-center w-full">
        {blogs?.length ? (
          <div className="flex justify-center flex-row mt-5 flex-wrap">
            <h2 className="w-full my-6 sm:my-10 text-2xl sm:text-3xl font-bold text-[#C53F56]">
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
      <div className="flex mt-5 justify-center w-full">
        {teamBlogs?.length ? (
          <div className="flex justify-center flex-row mt-5 flex-wrap">
            <h2 className="w-full my-6 sm:my-10 text-2xl sm:text-3xl font-bold text-[#C53F56]">
              Blogs de Equipo
            </h2>
            {teamBlogs.map((blog, index) => (
              <BlogResumeCard key={index} blog={blog as iBlogAccount} isOwner={isOwner} user={user} profileId={id}/>
            ))}
          </div>
        ) : (
          <p>No perteneces a ningún equipo.</p>
        )}
      </div>
    </div>
  )
}