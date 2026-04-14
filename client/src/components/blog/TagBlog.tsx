interface iTagBlogProps {
    tags : string[];
}


export default function TagBlog({ tags } : iTagBlogProps) {
  return (
    <div>
        <h3 className="text-2xl font-bold text-[#1f387f]">Tags</h3>
        <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
                <span key={index} className="bg-[#1f387f] text-white px-3 py-1 rounded-full">{tag}</span>
            ))}
        </div>
    </div>
  )
}
