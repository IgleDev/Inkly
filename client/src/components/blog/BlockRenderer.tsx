// components/blog/BlockRenderer.tsx
import type { iBlock } from "@/types/types";
import { BLOCK_TYPES } from "@/types/helperTypes";

interface iBlockRendererProps {
  block: iBlock;
}

export default function BlockRenderer({ block }: iBlockRendererProps) {
  if (block.type === BLOCK_TYPES.HEADING) {
    return <h1 className="text-4xl font-bold mt-3">{block.value}</h1>;
  }

  if (block.type === BLOCK_TYPES.PARAGRAPH) {
    return <p className="text-xl leading-relaxed mt-5">{block.value}</p>;
  }

  if (block.type === BLOCK_TYPES.IMAGE) {
    return (
      <figure className="w-full mt-5">
        <img src={block.value} alt={block.description || ""} className="w-full object-cover rounded-lg" />
        {block.description && (
          <figcaption className="text-sm text-gray-500 mt-1 text-center">{block.description}</figcaption>
        )}
      </figure>
    );
  }

  if (block.type === BLOCK_TYPES.VIDEO) {
    return (
      <div className="w-full mt-5">
        <video controls className="w-full rounded-lg">
          <source src={block.value} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (block.type === BLOCK_TYPES.QUOTE) {
    return (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-xl mt-5">
        {block.value}
      </blockquote>
    );
  }

  return null;
}