import ModalBlock from "@/components/Modals/ModalBlock";



export default function CreateBlogForm() {
  return (
    <div className="flex flex-col">
        <div className="w-full h-32 bg-[#6b91fa] rounded-xl border-4 border-[#1f387f] p-1">
          <div className="w-full border-white border-4 border-dashed flex items-center justify-center h-full">
            <ModalBlock />
          </div>
        </div>
    </div>
  )
}
