import type { iBlogRead } from "@/types/types";
import BlockRenderer from "./BlockRenderer";
import BlogInfo from "./BlogInfo";

interface iBlogContentProps {
  data: iBlogRead;
}

export default function BlogContent({ data }: iBlogContentProps) {
  const { blog, blocks } = data;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 pt-5">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <article className="lg:col-span-9 flex flex-col min-w-0">
          {blocks.sort((a, b) => a.order - b.order).map((block, index) => (
              <BlockRenderer key={index} block={block} />
            ))}
        </article>
        <article className="lg:col-span-3 flex flex-col">
          <div className="lg:sticky lg:top-5">
            <BlogInfo blog={blog} team={data.team} isSaved={data.isSaved}
            />
          </div>
        </article>
      </section>
    </main>
  );
}