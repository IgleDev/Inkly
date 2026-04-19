import type { iBlogPresentation } from "@/types/types"

interface iBlogResumeCardProps {
  blog : iBlogPresentation
}

export default function BlogResumeCard({ blog } : iBlogResumeCardProps) {
  return (
    <div className="flex flex-col mx-2 border-[#C53F56] bg-orange-300/10 p-3 border-2 rounded-lg cursor-pointer w-72">
      <h2 className="text-2xl font-bold w-80">{blog.title}</h2>
      <div className="mt-5">
        <p className="text-black/50">{blog.description}</p>
      </div>
      <div className="flex flex-wrap mt-10">
        {blog.tags.map((tag, index) => (
          <span key={index} className="bg-[#ee899a] mr-2 mt-2 p-2 px-3 rounded-full font-bold">#{tag}</span>
        ))}
      </div>
    </div>
  )
}
