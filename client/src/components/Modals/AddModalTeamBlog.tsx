"use client";

import { useState } from "react";
import { ExclamationTriangleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { inviteTeam } from "@/api/TeamAPI";
import { useMutation } from "@tanstack/react-query";

interface iAddModalTeamBlogProps {
    blogId : string
}

export default function AddModalTeamBlog({ blogId } : iAddModalTeamBlogProps) {
    const [email, setEmail] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const { mutate } = useMutation({
        mutationFn : inviteTeam,
        onError : (error) => console.log(error),
        onSuccess : (data) => {
            setEmail("");
            setOpen(false);
            console.log(data);
        }
    });

    if(!blogId) {
        return null;
    }

    const handleInvite = (email : string, blogId : string) => { mutate({ email, blogId }); };

    return (
        <div>
            <button onClick={() => setOpen(true)} className="flex items-center text-sm text-black border border-[#1f387f] px-4 sm:px-5 py-1 rounded-full transition-colors mt-2 mb-4 w-fit">
                <PlusCircleIcon className="w-6 h-6 text-[#1f387f] mr-2" /> Añadir equipo
            </button>

            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
                <DialogBackdrop transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel transition
                            className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in w-full max-w-md sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex flex-col sm:flex-row sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-blue-400" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <DialogTitle as="h3" className="text-base font-semibold text-white">
                                            Añade a un colega al trabajo!
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-400 break-words">
                                                ¿Estas cansado de tanto escribir un blog? ¿No sabes escribir bien tus ideas?
                                                Invita a un colega a que te ayude a escribir. Podrás añadir tantos colegas como quieras y ellos podrán
                                                ayudarte a escribir y editar tu blog. No te preocupes, no podrán publicar el blog sin tu permiso.
                                            </p>
                                        </div>
                                        <div className="flex flex-col w-full mt-2">
                                            <input onChange={(e) => setEmail(e.target.value)} 
                                                type="email" value={email}
                                                placeholder="ejemplo@dominio.com" 
                                                className="w-full mt-2 bg-gray-700 text-white placeholder:text-gray-500 border border-gray-600 focus:ring-blue-500 focus:outline-none rounded-xl p-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-700/25 px-4 py-3 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:px-6">
                                <button type="button" data-autofocus onClick={() => setOpen(false)}
                                    className="inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:w-auto"
                                >
                                    No añadir
                                </button>
                                <button type="submit" onClick={() => handleInvite(email, blogId)}
                                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-400 sm:w-auto transition-colors"
                                >
                                    Mandar correo
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}