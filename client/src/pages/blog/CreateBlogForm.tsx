import BlockEditor from "@/components/blog/BlockEditor";
import ModalBlock from "@/components/Modals/ModalBlock";
import OptionsModalBlock from "@/components/Modals/OptionsModalBlock";
import { useAppStore } from "@/stores/useAppStore";
export default function CreateBlogForm() {
  const blocks = useAppStore(state => state.blocks);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {blocks.map(block => (
          <div key={block.order}>
            <BlockEditor key={block.order} block={block} />
          </div>
        ))}
        <div className="w-full h-24 sm:h-32 bg-[#6b91fa] rounded-xl border-4 border-[#1f387f] p-1">
          <div className="w-full border-white border-4 border-dashed flex items-center justify-center h-full">
            <ModalBlock />
          </div>
        </div>
      </div>
      <OptionsModalBlock />
    </div>
  )
}