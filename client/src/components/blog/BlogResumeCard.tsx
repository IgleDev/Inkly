import { formatDate } from "@/helper"
import { Link } from "react-router-dom"
import type { iBlogAccount } from "@/types/types"

interface iBlogResumeCardProps {
  blog : iBlogAccount,
  isOwner? : boolean
}

export default function BlogResumeCard({ blog, isOwner } : iBlogResumeCardProps) {
  return (
    <Link to={`/blog/${blog._id}`} className="flex justify-between flex-col mx-2 border-[#C53F56] bg-orange-300/10 p-3 border-2 rounded-lg cursor-pointer w-72">
      <h2 className="text-2xl font-bold text-wrap">{blog.title}</h2>
      <div className="mt-5">
        <p className="text-black/50">{blog.description}</p>
      </div>
      <div className="flex flex-wrap mt-10">
        {blog.tags.map((tag, index) => (
          <span key={index} className="bg-[#ee899a] mr-2 mt-2 p-2 px-3 rounded-full font-bold">#{tag}</span>
        ))}
      </div>
      {isOwner && 
        <div>
          <button className="bg-[#C53F56] text-white px-3 py-1 mt-4 mr-2 rounded-xl">Eliminar</button>
          <button className="bg-[#FFAA50] text-white px-3 py-1 mt-4 mr-2 rounded-xl">Editar</button>
        </div>
      }
      <p className="mt-5 text-gray-500 ">
        {blog?.createdAt && (
          <>
            {blog.updatedAt !== blog.createdAt ? 'Actualizado el ' : 'Creado el '}
            {blog.updatedAt !== blog.createdAt ? formatDate(blog.updatedAt) : formatDate(blog.createdAt)} 
            <span className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-full text-xs font-semibold ${blog.published? 'bg-green-100 text-green-700'
              : 'bg-gray-200 text-gray-600'}`}>
                <span
                  className={`w-2 h-2 rounded-full ${blog.published ? 'bg-green-500' : 'bg-gray-400'}`}
                />
                {blog.published ? 'Publicado' : 'Borrador'}
            </span>
          </>
        )}
      </p>
    </Link>
  )
}
