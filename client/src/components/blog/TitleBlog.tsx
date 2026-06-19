import { useAppStore } from "@/stores/useAppStore";

export default function TitleBlog() {
    const headingBlock = useAppStore(state => state.blocks.find(b => b.type === 'heading'));

    return (
      <div className="mb-4 w-full">
        <h3 className="text-xl sm:text-2xl font-bold text-[#1f387f]">Título del blog</h3>
        <p className="font-bold text-gray-700 min-h-[1.5em] break-words text-lg sm:text-xl">
          <span>{headingBlock ? headingBlock.value : 'Este es mi primer blog!'}</span>
        </p>
      </div>
    );
}