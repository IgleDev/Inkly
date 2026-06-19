import type { iBlock } from "@/types/types";
import { BLOCK_TYPES } from "@/types/helperTypes";

interface iBlockRendererProps {
  block: iBlock;
}

export default function BlockRenderer({ block }: iBlockRendererProps) {
  if (block.type === BLOCK_TYPES.HEADING) {
    return (
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 break-words">
        {block.value}
      </h1>
    );
  }

  if (block.type === BLOCK_TYPES.PARAGRAPH) {
    return (
      <p className="text-base sm:text-lg lg:text-xl leading-relaxed mt-5 break-words">
        {block.value}
      </p>
    );
  }

  if (block.type === BLOCK_TYPES.IMAGE) {
    return (
      <figure className="w-full mt-5">
        <img
          src={block.value}
          alt={block.description || ""}
          className="w-full object-cover rounded-lg max-h-[600px]"
        />

        {block.description && (
          <figcaption className="text-xs sm:text-sm text-gray-500 mt-2 text-center break-words">
            {block.description}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block.type === BLOCK_TYPES.VIDEO) {
    return (
      <div className="w-full mt-5">
        <video controls className="w-full rounded-lg max-h-[600px]">
          <source src={block.value} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (block.type === BLOCK_TYPES.QUOTE) {
    return (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-lg sm:text-xl mt-5 break-words">
        {block.value}
      </blockquote>
    );
  }

  return null;
}