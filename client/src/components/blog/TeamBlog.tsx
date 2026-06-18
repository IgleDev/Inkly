import type { TeamMember } from "@/types/helperTypes";
import AddModalTeamBlog from "../Modals/AddModalTeamBlog"
import { useLocation } from "react-router-dom";


interface iTeamBlogsProps {
    team: TeamMember[];
    blogId?: string;
}


export default function TeamBlog({ team, blogId } : iTeamBlogsProps) {
    const location = useLocation();
    const showAddModal = location.pathname === '/blog/new/'

    return (
        <div className="my-5">
            <h3 className="text-2xl font-bold text-[#1f387f]">Equipo</h3>
            <ul>
                {team.length > 0 ? (
                    team.map(member => (
                        <li key={member._id}><a target="_blank" href={`/perfil/${member._id}`}>{member.name}</a></li>
                    ))
                ) : (
                    <li>No hay miembros en el equipo.</li>
                )}
            </ul>
            {showAddModal && <AddModalTeamBlog blogId={blogId!} />}
        </div>
    )
}
