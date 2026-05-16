import { useState } from "react";
import { formatDate } from "@/helper";
import type { iBlogRead } from "@/types/types"
import { Link, useParams } from "react-router-dom";
import { CalendarDateRangeIcon, ShareIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/16/solid";

interface iBlogInfoProps {
    blog : iBlogRead['blog'];
}

export default function BlogInfo({ blog } : iBlogInfoProps) {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

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
        <div className="flex justify-between items-center">
            <h2 className="text-xl text-gray-400 font-bold">Escrito por {''} <Link to={`/perfil/${blog.owner._id}`}>{blog?.owner?.name}</Link></h2>
            <img src={blog.owner.photoProfile} alt={`Foto de ${blog.owner.name}`} className="w-10 h-10"/>
        </div>  
        <div className="text-base text-gray-400 w-full mt-5">
            <p>{blog.description}</p>
        </div>
        <div className="mt-10">
            <h2 className="text-gray-400 font-bold text-xl mb-4">Tags</h2>
            <div className="flex flex-row flex-wrap">
                {blog.tags.map((tag, index) => (
                    <span key={index} className="mr-2 mt-2 p-2 px-3 rounded-full text-base font-bold bg-[#9C9999]">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
        <p className="flex items-center text-sm font-semibold text-gray-400 mt-10">
            <CalendarDateRangeIcon className="w-6 h-6 mr-2"/> Creado el {formatDate(blog?.createdAt)}
        </p>

        <button onClick={handleShare} className="flex items-center gap-2 mt-6 text-sm font-semibold text-gray-400 transition-colors cursor-pointer">
            {copied
                ? <><ClipboardDocumentCheckIcon className="w-5 h-5 text-green-400"/> <span className="text-green-400">¡Enlace copiado!</span></>
                : <><ShareIcon className="w-5 h-5"/> Compartir</>
            }
        </button>
    </>
  )
}