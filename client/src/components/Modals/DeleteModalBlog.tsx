"use client";

import React from "react";
import { deleteBlog } from "@/api/BlogAPI";
import { useNavigate, useLocation } from "react-router-dom";
import type { iBlogAccount, iUser } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

interface iDeleteModalBlogProps {
    blog : iBlogAccount,
    user? : iUser,
    profileId? : string;
}

export default function DeleteModalBlog({ blog, user, profileId } : iDeleteModalBlogProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const showModal = queryParams.get('deleteBlog') === 'true';

    const [userInput, setUserInput] = React.useState('');

    const { mutate } = useMutation({
        mutationFn : (id : string) => deleteBlog(id),
        onSuccess : () => { 
            queryClient.invalidateQueries({ queryKey : ['user', 'blogs', profileId] });
            setUserInput('');
            navigate(location.pathname, { replace: true });
        },
        onError : () => { console.log('Error al eliminar el blog') }
    })

    const isValid = userInput === `${user?.name?.trim().toLocaleLowerCase()}/${blog.title?.toLocaleLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div>
            <button onClick={() => navigate(location.pathname + `?deleteBlog=true`)} className="bg-[#C53F56] text-white px-3 py-1 mt-4 mr-2 rounded-xl">Eliminar</button>
            <Dialog open={showModal} onClose={() => navigate(location.pathname, { replace: true })} className="relative z-10">
                <DialogBackdrop transition
                className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel transition
                      className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-400" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-white">
                                        Estás apunto de eliminar tu blog!
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-400">
                                            <span className="font-bold">¡ESPERA! Estás a punto de eliminar tu blog.</span> 
                                            Este acción no se puede deshacer.
                                            Si quieres borrar tu blog, tendrás que escribir:
                                        </p>
                                        <span className="font-mono text-sm bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded">
                                            {user?.name?.trim().toLocaleLowerCase()}/{blog.title?.toLocaleLowerCase().replace(/\s+/g, '-')}  
                                        </span>
                                        <input type="text" onChange={(e) => setUserInput(e.target.value)} value={userInput}
                                            className="w-full mt-2 bg-gray-700 text-white placeholder:text-gray-500 border border-red-600 focus:ring-red-500 focus:outline-none rounded-xl p-2 font-bold text-lg"
                                            placeholder={`${user?.name?.trim().toLocaleLowerCase()}/${blog.title?.toLocaleLowerCase().replace(/\s+/g, '-')}`} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row justify-end sm:px-6">
                            <button type="button" data-autofocus onClick={() => navigate(location.pathname, { replace: true })}
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                            >
                                He cambiado de idea
                            </button>
                            <button type="button" onClick={() => mutate(blog._id)} disabled={!isValid}
                                className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600 sm:ml-3 sm:w-auto transition-colors disabled:bg-red-900/50 disabled:text-gray-600"
                            >
                                BORRAR
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
          </Dialog>
        </div>
    );
}