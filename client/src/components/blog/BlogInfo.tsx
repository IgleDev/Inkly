import TeamBlog from "./TeamBlog";
import { formatDate } from "@/helper";
import { saveBlog } from "@/api/BlogAPI";
import { useEffect, useState } from "react";
import type { iBlogRead } from "@/types/types"
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { CalendarDateRangeIcon, ShareIcon, ClipboardDocumentCheckIcon, BookmarkSlashIcon } from "@heroicons/react/16/solid";

interface iBlogInfoProps {
    blog : iBlogRead["blog"];
    team : iBlogRead["team"];
    isSaved : boolean;
}

export default function BlogInfo({ blog, isSaved, team } : iBlogInfoProps) {
    const { id } = useParams();
    const [copied, setCopied] = useState(false);
    const [saved, setSaved] = useState(isSaved);

    useEffect(() => {
        setSaved(isSaved);
    }, [isSaved]);

    const { mutate } = useMutation({
        mutationFn : saveBlog,
        onError : (error) => console.log(error),
        onSuccess : (data) => {
            setSaved(data.isSaved)
        }
    });

    const handleSave = (blogId : string) => { mutate(blogId); }

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/blog/${id}`;

        if (navigator.share) {
            await navigator.share({ title: blog.title, url: shareUrl });
        } else {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h2 className="text-xl text-gray-400 font-bold break-words">
                    Escrito por{" "}
                    <Link to={`/perfil/${blog.owner._id}`}>
                        {blog?.owner?.name}
                    </Link>
                </h2>

                <img
                    src={blog.owner.photoProfile}
                    alt={`Foto de ${blog.owner.name}`}
                    className="w-10 h-10 rounded-full object-cover self-start sm:self-auto"
                />
            </div>

            <div className="text-base text-gray-400 w-full mt-5 break-words">
                <p>{blog.description}</p>
            </div>

            <div className="mt-10">
                <h2 className="text-gray-400 font-bold text-xl mb-4">
                    Tags
                </h2>

                <div className="flex flex-row flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="p-2 px-3 rounded-full text-sm sm:text-base font-bold bg-[#9C9999] break-all"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            <TeamBlog team={team} blogId={blog._id} />

            <p className="flex items-center flex-wrap gap-2 text-sm font-semibold text-gray-400 mt-10">
                <CalendarDateRangeIcon className="w-6 h-6" />
                Creado el {formatDate(blog?.createdAt)}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 mt-6 text-sm font-semibold text-gray-400 transition-colors cursor-pointer"
                >
                    {copied
                        ? (
                            <>
                                <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-400" />
                                <span className="text-green-400">
                                    ¡Enlace copiado!
                                </span>
                            </>
                        )
                        : (
                            <>
                                <ShareIcon className="w-5 h-5" />
                                Compartir
                            </>
                        )}
                </button>

                <button
                    onClick={() => handleSave(blog._id)}
                    className="flex items-center gap-2 mt-6 text-sm font-semibold text-gray-400 transition-colors cursor-pointer"
                >
                    {saved
                        ? (
                            <>
                                <BookmarkSlashIcon className="w-5 h-5 text-blue-400" />
                                <span className="text-blue-400">
                                    Guardado
                                </span>
                            </>
                        )
                        : (
                            <>
                                <BookmarkIcon className="w-5 h-5" />
                                Guardar
                            </>
                        )}
                </button>
            </div>
        </>
    );
}