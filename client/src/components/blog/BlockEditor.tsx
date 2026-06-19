import { maxLengths } from "@/helper";
import { useAppStore } from "@/stores/useAppStore";
import { TrashIcon } from "@heroicons/react/24/outline";
import { BLOCK_TYPES, type iBlockSelect } from "@/types/helperTypes";

interface iBlockEditorProps {
    block: iBlockSelect;
}

export default function BlockEditor({ block }: iBlockEditorProps) {
    const updateBlock = useAppStore((state) => state.updateBlock);
    const deleteBlock = useAppStore((state) => state.deleteBlock);

    if (block.type === BLOCK_TYPES.HEADING) {
        return (
            <div className="flex flex-col group/title w-full">
                <input
                    className="w-full resize-none bg-transparent outline-none text-2xl sm:text-3xl lg:text-4xl"
                    placeholder="Titulo..."
                    type="text"
                    maxLength={maxLengths.BLOG_TITLE}
                    value={block.value}
                    onChange={(e) =>
                        updateBlock(block.order, e.target.value)
                    }
                />

                <label className="text-gray-400 text-sm">
                    {block.value.length}/{maxLengths.BLOG_TITLE}
                </label>

                <button
                    onClick={() => deleteBlock(block.order)}
                    className="self-start mt-2 opacity-100 sm:opacity-0 sm:group-hover/title:opacity-100 transition"
                >
                    <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                </button>
            </div>
        );
    }

    if (block.type === BLOCK_TYPES.PARAGRAPH) {
        return (
            <div className="flex flex-col group/paragraph w-full">
                <textarea
                    className="w-full resize-none bg-transparent outline-none text-lg sm:text-xl"
                    rows={3}
                    maxLength={maxLengths.BLOCK_PARAGRAPH}
                    name={block.type}
                    id={`block-${block.order}`}
                    placeholder="Escribe tu párrafo..."
                    value={block.value}
                    onChange={(e) =>
                        updateBlock(block.order, e.target.value)
                    }
                />

                <label className="text-gray-400 text-sm">
                    {block.value.length}/{maxLengths.BLOCK_PARAGRAPH}
                </label>

                <button
                    onClick={() => deleteBlock(block.order)}
                    className="self-start mt-2 opacity-100 sm:opacity-0 sm:group-hover/paragraph:opacity-100 transition"
                >
                    <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                </button>
            </div>
        );
    }

    if (block.type === BLOCK_TYPES.IMAGE) {
        const handleFileChange = (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const tempUrl = URL.createObjectURL(file);
            updateBlock(block.order, tempUrl, file);
        };

        return (
            <div className="w-full flex flex-col group/image">
                {block.value ? (
                    <div className="w-full">
                        <img
                            src={block.value}
                            className="w-full object-cover rounded-lg max-h-[500px]"
                        />

                        <button
                            onClick={() => deleteBlock(block.order)}
                            className="mt-2 opacity-100 sm:opacity-0 sm:group-hover/image:opacity-100 transition"
                        >
                            <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                        </button>
                    </div>
                ) : (
                    <label className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer text-center p-4">
                        <span className="text-gray-400">
                            Seleccionar imagen
                        </span>

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                )}
            </div>
        );
    }

    if (block.type === BLOCK_TYPES.VIDEO) {
        const handleFileChange = (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const tempUrl = URL.createObjectURL(file);
            updateBlock(block.order, tempUrl, file);
        };

        return (
            <div className="w-full flex flex-col group/video">
                {block.value ? (
                    <div className="w-full">
                        <video controls className="w-full rounded-lg max-h-[500px]">
                            <source src={block.value} type="video/mp4" />
                        </video>

                        <button
                            onClick={() => deleteBlock(block.order)}
                            className="mt-2 opacity-100 sm:opacity-0 sm:group-hover/video:opacity-100 transition"
                        >
                            <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                        </button>
                    </div>
                ) : (
                    <label className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer text-center p-4">
                        <span className="text-gray-400">
                            Seleccionar vídeo
                        </span>

                        <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                )}
            </div>
        );
    }

    if (block.type === BLOCK_TYPES.QUOTE) {
        return (
            <div className="flex flex-col group/quote w-full">
                <blockquote className="border-l-4 border-gray-300 pl-4 italic text-base sm:text-lg break-words">
                    {block.value}
                </blockquote>

                <button
                    onClick={() => deleteBlock(block.order)}
                    className="self-start mt-2 opacity-100 sm:opacity-0 sm:group-hover/quote:opacity-100 transition"
                >
                    <TrashIcon className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                </button>
            </div>
        );
    }

    return null;
}