import type { iBlogRead } from "@/types/types";
import BlockRenderer from "./BlockRenderer";
import BlogInfo from "./BlogInfo";

interface iBlogContentProps {
  data : iBlogRead
}

export default function BlogContent({ data } : iBlogContentProps) {
  const { blog, blocks } = data;
  return (
    <main className="max-w-5xl mx-auto pt-5">
      <section className="grid grid-cols-12 gap-10">
        <article className="col-span-9 flex flex-col">
          {blocks.sort((a, b) => a.order - b.order).map((block, index) => (
            <BlockRenderer key={index} block={block}/>
          ))}
        </article>
        <article className="col-span-3 flex flex-col">
          <div className="sticky top-5">
            <BlogInfo blog={blog}/>
          </div>
        </article>
      </section>
    </main>
  )
}
