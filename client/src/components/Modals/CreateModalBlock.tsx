"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "@/stores/useAppStore";
import { ExclamationTriangleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

export default function CreateModalBlock() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const closeModalBack = useAppStore(state => state.closeModalBack);

    const queryParams = new URLSearchParams(location.search);
    const showModal = queryParams.get('createBlog') === 'true';

    const handleOpen = () => {
        navigate(location.pathname + '?createBlog=true');
    }

    const handleClose = () => {
        navigate(location.pathname, { replace: true });
    }

    const handleClosePag = () => {
        closeModalBack();
        navigate("/", { replace : true });
    }

    return (
        <div>
            <button onClick={handleOpen} className="text-sm text-gray-500 hover:text-[#C53F56] transition-colors mb-4 p-5">
                <ArrowLeftIcon /> Volver
            </button>

            <Dialog open={showModal} onClose={handleClose} className="relative z-10">
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
                                        <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-blue-400" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-white">
                                            Estás apunto de abandonar!
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-400">
                                                <span className="font-bold">¡ESPERA! Aún no has guardado tu blog.</span>
                                                Seguro que tienes un montón de cosas interesantes por decir.
                                                Guarda tu blog para luego seguir editandolo más tarde. Estaremos interesados en leer tus opiniones!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row justify-end sm:px-6">
                                <button type="button" data-autofocus onClick={handleClose}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                                >
                                    Seguir Escribiendo
                                </button>
                                <button type="button" onClick={handleClosePag}
                                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-400 sm:ml-3 sm:w-auto transition-colors"
                                >
                                    Salir
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}