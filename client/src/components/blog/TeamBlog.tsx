import AddModalTeamBlog from "../Modals/AddModalTeamBlog"

interface iTeamBlogsProps {
    team : string[],
    blogId : string | undefined,
}

export default function TeamBlog({ team, blogId } : iTeamBlogsProps) {
  return (
    <div className="my-5">
        <h3 className="text-2xl font-bold text-[#1f387f]">Equipo</h3>
        <ul>
            {team.map((member, index) => (
                <li key={index}>{member}</li>
            ))}
        </ul>
        <AddModalTeamBlog blogId={blogId!} />
    </div>
  )
}
