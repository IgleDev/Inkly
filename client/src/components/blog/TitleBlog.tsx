interface iTitleBlogsProps {
  titulo : string
}

export default function TitleBlog({ titulo } : iTitleBlogsProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-[#1f387f]">Título del artículo</h3>
      <p>{titulo}</p>
    </div>
  )
}
