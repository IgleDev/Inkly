import { formatDate } from "@/helper";
import { Link, useNavigate } from "react-router-dom";
import DeleteModalBlog from "../Modals/DeleteModalBlog";
import type { iBlogAccount, iUser } from "@/types/types";
import { CalendarDateRangeIcon, PencilIcon } from "@heroicons/react/16/solid";

interface iBlogResumeCardProps {
  blog: iBlogAccount,
  isOwner?: boolean,
  user?: iUser
  profileId?: string;
}

export default function BlogResumeCard({ blog, isOwner, user, profileId }: iBlogResumeCardProps) {
  const navigate = useNavigate();
  const location = window.location.pathname;

  return (
    <div className="w-full sm:w-72 mt-2">
      <div className="flex justify-between flex-col mx-2 border-[#C53F56] bg-orange-300/10 p-3 border-2 rounded-lg cursor-pointer h-full">
        <Link to={`/blog/${blog._id}`}>
          <h2 className="text-xl sm:text-2xl font-bold break-words">{blog.title}</h2>
          <div className="mt-5">
            <p className="text-black/50 break-words">{blog.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-10">
            {blog.tags.map((tag, index) => (
              <span key={index} className="bg-[#ee899a] p-2 px-3 rounded-full font-bold text-sm sm:text-base break-all">#{tag}</span>
            ))}
          </div>
        </Link>

        {isOwner && (
          <>
            <div className="flex flex-wrap gap-2">
              <DeleteModalBlog blog={blog} user={user} profileId={profileId} />
              {!blog.published && (
                <button className="flex items-center bg-[#FFAA50] text-white px-3 py-1 mt-4 rounded-xl" onClick={() => navigate(`/new/edit-blog/${blog._id}`)}>
                  <PencilIcon className="w-5 h-5 mr-2" /> Editar
                </button>
              )}
            </div>
            <p className="mt-10 text-gray-500">
              {blog?.createdAt && location === `/perfil/${profileId}` && (
                <div>
                  <div className="flex items-center flex-wrap">
                    <CalendarDateRangeIcon className="w-6 h-6 mr-2" />
                    {blog.updatedAt !== blog.createdAt ? 'Actualizado el ' : 'Creado el '}
                    {blog.updatedAt !== blog.createdAt ? formatDate(blog.updatedAt) : formatDate(blog.createdAt)}
                  </div>
                  <span className={`inline-flex items-center gap-2 px-2 py-0.5 mt-5 rounded-full text-xs font-semibold ${blog.published ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'}`}>
                    <span
                      className={`w-2 h-2 rounded-full ${blog.published ? 'bg-green-500' : 'bg-gray-400'}`}
                    />
                    {blog.published ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  )
}