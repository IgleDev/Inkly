import { maxLengths } from "@/helper";
import { useAppStore } from "@/stores/useAppStore"

export default function DescriptionBlog() {
    const description = useAppStore(state => state.blogDraft.description);
    const updateDescription = useAppStore(state => state.updateDescription);
    return (
        <div className="w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1f387f]">Descripción</h3>
            <textarea className="w-full h-44 bg-transparent mt-2 resize-none break-words" placeholder="Describe tu blog aquí..." 
                maxLength={maxLengths.BLOG_DESCRIPTION} value={description} onChange={(e) => updateDescription(e.target.value)}>
            </textarea>
            <label className="text-gray-400 text-sm">{description?.length}/{maxLengths.BLOG_DESCRIPTION}</label>
        </div>
  )
}