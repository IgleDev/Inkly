import type { iBlock } from "@/types/types";
import BlockRenderer from "./BlockRenderer";

interface iBlogContentProps {
  blocks : iBlock[]
}

export default function BlogContent({blocks } : iBlogContentProps) {
  return (
    <div>
      {blocks.sort((a, b) => a.order - b.order).map((block, index) => (
        <BlockRenderer key={index} block={block}/>
      ))}
    </div>
  )
}
