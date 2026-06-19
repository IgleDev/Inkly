import type { TeamMember } from "@/types/helperTypes";
import AddModalTeamBlog from "../Modals/AddModalTeamBlog"
import { useLocation } from "react-router-dom";

interface iTeamBlogsProps {
    team: TeamMember[];
    blogId?: string;
}

export default function TeamBlog({ team, blogId } : iTeamBlogsProps) {
    const location = useLocation();
    const showAddModal = location.pathname.includes('/new/edit-blog');

    return (
        <div className="my-5 w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1f387f]">Equipo</h3>
            <ul>
                {team.length > 0 ? (
                    team.map(member => (
                        <li key={member._id}>
                            <div className="flex items-center gap-2 my-2 break-all">
                                {member.photoProfile !== undefined ? (
                                    <img src={member.photoProfile} alt={member.name} className="w-5 h-5 rounded-full object-cover flex-shrink-0" />
                                ) : (
                                    <img src={"/fotoDefault.jpg"} alt={member.name} className="w-5 h-5 rounded-full object-cover flex-shrink-0"/>
                                )}
                                <a className="cursor-pointer break-all" target="_blank" href={`/perfil/${member._id}`}>
                                    {member.name}
                                </a>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No hay miembros en el equipo.</li>
                )}
            </ul>
            {showAddModal && <AddModalTeamBlog blogId={blogId!} />}
        </div>
    )
}