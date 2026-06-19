import { useAppStore } from "@/stores/useAppStore";
import TagsModal from "../Modals/TagsModal";


export default function TagBlog() {
    const tags = useAppStore(state => state.tags)
    return (
        <div className="w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1f387f]">Tags</h3>
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                    <button key={index} className="text-xs sm:text-sm text-white bg-[#1f387f] border border-[#1f387f] px-4 sm:px-5 py-1 rounded-full transition-colors mb-4 break-all">{`#${tag}`}</button>
                ))}
                <TagsModal />
            </div>
        </div>
    )
}