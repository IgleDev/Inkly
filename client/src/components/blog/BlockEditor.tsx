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

    if (block.type === BLOCK_TYPES.IMAGE) {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const tempUrl = URL.createObjectURL(file);
            updateBlock(block.order, tempUrl, file);
        };

        return (
            <div className="w-full">
            {block.value
                ? <img src={block.value} className="w-full object-cover rounded-lg" />
                : <label className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer">
                    <span className="text-gray-400">Seleccionar imaxe</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
            }
            </div>
        );
    }

    if(block.type === BLOCK_TYPES.VIDEO) {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const tempUrl = URL.createObjectURL(file);
            updateBlock(block.order, tempUrl, file);
        };
        return (
            <div className="w-full">
            {block.value
                ? <video controls className="w-full rounded-lg">
                    <source src={block.value} type="video/mp4" />
                </video>
                : <label className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer">
                    <span className="text-gray-400">Seleccionar vídeo</span>
                    <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                </label>
            }
            </div>
        );
    }

    if(block.type === BLOCK_TYPES.QUOTE) {
        return (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic">{block.value}</blockquote>
        )
    }

}
