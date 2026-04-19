"use client";

import { useAppStore } from "@/stores/useAppStore";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function TagsModal() {
    const [tag, setTag] = useState("")
    const modalTags = useAppStore(state => state.modalTags);
    const closeModalTags = useAppStore(state => state.closeModalTags);
    const openModalTags = useAppStore(state => state.openModalTags);
    const tags = useAppStore(state => state.tags)
    const setTags = useAppStore(state => state.setTags);


    const handleAddTag = () => {
        const newTag = tag.trim();
        if (!newTag) return;
        setTags([...tags, newTag]);
        setTag("");
    }

    return (
        <div>
            <button onClick={openModalTags} className="text-sm text-black border border-[#1f387f] px-5 py-1 rounded-full transition-colors mb-4">
                Añadir Tag 
            </button>
            <Dialog open={modalTags} onClose={closeModalTags} className="relative z-10">
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
                                    <InformationCircleIcon aria-hidden="true" className="size-6 text-blue-400" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-white">
                                        Estás apuno de añadir un <i className="text-gray-400">Tag</i>!
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-400">
                                            Esto herramiento sirve para poder filtrar por temas de interes y hacer que nuestros lectores 
                                            vayan directos al grano. Puedes añadir hasta un máximo de 3 <i className="font-bold">TAGS</i> por blog. 
                                        </p>
                                    </div>
                                    <div className="flex flex-col w-full mt-5">
                                        <input value={tag} placeholder="Añadir tags" onChange={(e) => setTag(e.target.value)}
                                            className="mt-2 bg-gray-700 text-white placeholder:text-gray-500 border border-gray-600 focus:ring-blue-500 focus:outline-none rounded-xl p-2" />
                                        <button type="button" onClick={handleAddTag}
                                        className="mt-2 w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-400 sm:w-auto transition-colors"
                                        >
                                            Añadir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row justify-end sm:px-6">
                            <button type="button" data-autofocus onClick={closeModalTags}
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                            >
                                Cancelar
                            </button>
                            <button type="button" onClick={closeModalTags}
                                className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-400 sm:ml-3 sm:w-auto transition-colors"
                            >
                                Añadir
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
          </Dialog>
        </div>
    );
}