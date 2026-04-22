import type { iBlogPresentation } from "@/types/types"
import { Link } from "react-router-dom"

interface iBlogResumeCardProps {
  blog : iBlogPresentation,
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
        </div>}
    </Link>
  )
}
