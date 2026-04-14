import { useAppStore } from "@/stores/useAppStore"

export default function DescriptionBlog() {
    const description = useAppStore(state => state.blogDraft.description);
    const updateDescription = useAppStore(state => state.updateDescription);
    return (
        <div>
            <h3 className="text-2xl font-bold text-[#1f387f]">Descripción</h3>
            <textarea className="w-full h-44 bg-transparent mt-2 resize-none" placeholder="Describe tu blog aquí..." 
                value={description} onChange={(e) => updateDescription(e.target.value)}>
            </textarea>
        </div>
  )
}
