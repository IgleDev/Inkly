import { useAppStore } from "@/stores/useAppStore"
import { BLOCK_TYPES, type iBlockSelect } from "@/types/helperTypes"

interface iBlockEditorProps {
    block : iBlockSelect
}

export default function BlockEditor({ block } : iBlockEditorProps) {
    const updateBlock = useAppStore(state => state.updateBlock);

    if(block.type === BLOCK_TYPES.HEADING) {
        return (
            <input className="w-full resize-none bg-transparent outline-none text-4xl" placeholder="Titulo..."
                value={block.value} onChange={(e) => updateBlock(block.order, e.target.value)}>
            </input>
        )
    }

    if(block.type === BLOCK_TYPES.PARAGRAPH) {
        return (
            <textarea className="w-full resize-none bg-transparent outline-none text-xl" rows={3} name={block.type} id={`block-${block.order}`}
                placeholder="Escribe tu párrafo..." value={block.value} onChange={(e) => updateBlock(block.order, e.target.value)}>
            </textarea>
        )
    }

    if(block.type === BLOCK_TYPES.IMAGE) {
        return (
            <div className="w-full">
                <img src={block.value} alt="Imagen subida" className="w-full object-cover rounded-lg"/>
            </div>
        )
    }

    if(block.type === BLOCK_TYPES.VIDEO) {
        return (
            <div className="w-full">
                <video controls className="w-full rounded-lg">
                    <source src={block.value} type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                </video>
            </div>
        )
    }

    if(block.type === BLOCK_TYPES.QUOTE) {
        return (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic">{block.value}</blockquote>
        )
    }

}
