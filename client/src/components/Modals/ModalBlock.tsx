"use client";

import { type tBlockType } from "@/types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "@/stores/useAppStore";
import { BlockSelection } from "@/types/helperTypes";
import { InformationCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

export default function ModalBlock() {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const showModal = queryParams.get('addBlock') === 'true';

    const selectRadioBlock = useAppStore(state => state.selectRadioBlock);
    const selectedBlock = useAppStore(state => state.selectedBlock);
    const addRadioBlock = useAppStore(state => state.addRadioBlock);
    const openModalUpload = useAppStore(state => state.openModalUpload);

    const NEEDS_UPLOAD = ["image", "video", "quote"];

    const handleOpen = () => {
        navigate(location.pathname + '?addBlock=true');
    }

    const handleClose = () => {
        navigate(location.pathname, { replace: true });
    }

    const handleAddBlock = () => {
        if (!selectedBlock) return;

        if (NEEDS_UPLOAD.includes(selectedBlock)) {
            handleClose();
            openModalUpload();
        } else {
            addRadioBlock(selectedBlock, '', '');
            handleClose();
        }
    }

    return (
        <div>
            <button onClick={handleOpen}
                className="flex items-center justify-center w-full sm:w-auto rounded-md bg-white/10 px-2.5 py-1.5 text-lg sm:text-2xl font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20">
                <PlusCircleIcon className="w-8 h-8 sm:w-10 sm:h-10 mr-2" /> Agregar Bloque
            </button>
            <Dialog open={showModal} onClose={handleClose} className="relative z-10">
                <DialogBackdrop transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel transition
                            className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in w-full max-w-md sm:my-8 sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex flex-col sm:flex-row sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                                        <InformationCircleIcon aria-hidden="true" className="size-6 text-blue-400" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <DialogTitle as="h3" className="text-base font-semibold text-white">
                                            Agrega un bloque a tu blog!
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-400 break-words">
                                                Aquí podrás escoger entre diferentes tipos de bloques para agregar tu blog.
                                                Podrás elegir entre títulos, párrafos, imágenes, videos, listas y más.
                                                Y en tan solo un click ¡Así de fácil!
                                            </p>
                                        </div>
                                        <div className="w-full mt-5">
                                            <div className="flex flex-col gap-2">
                                                {Object.entries(BlockSelection).map(([key, label]) => (
                                                    <div key={key} className="w-full bg-[#1f387F] text-white px-4 py-2 rounded-full">
                                                        <div className="flex justify-between items-center gap-2">
                                                            <input type="radio" id={key} name="block" value={key} className={key} onChange={() => selectRadioBlock(key as tBlockType)} />
                                                            <label htmlFor={key} className="text-base sm:text-xl font-bold break-words">{label}</label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-700/25 px-4 py-3 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:px-6">
                                <button type="button" data-autofocus onClick={handleClose}
                                    className="inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:w-auto"
                                >
                                    Cancelar
                                </button>
                                <button type="button" onClick={handleAddBlock} disabled={!selectedBlock}
                                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-400 sm:w-auto transition-colors"
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