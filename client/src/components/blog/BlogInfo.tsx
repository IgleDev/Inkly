import { formatDate } from "@/helper";
import type { iBlogRead } from "@/types/types"

interface iBlogInfoProps {
    blog : iBlogRead['blog'];
}

export default function BlogInfo({ blog } : iBlogInfoProps) {
  return (
    <>
        <p className="text-sm text-gray-400 font-bold">Escrito por {''} {blog?.owner?.name}</p>
        <div className="text-md text-gray-400 w-full mt-5">
            {blog.description}
        </div>
        <div className="mt-10">
            <h2>Tags</h2>
            <div className="flex flex-row flex-wrap">
                {blog.tags.map((tag, index) => (
                    <span key={index} className="mr-2 mt-2 p-2 px-3 rounded-full text-sm bg-[#9C9999]">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
        <p className="text-sm text-gray-400 mt-10">Creado el {formatDate(blog?.createdAt)}</p>
    </>
  )
}
