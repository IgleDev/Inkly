"use client";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useAppStore } from "@/stores/useAppStore";
import { useState } from "react";
import { BLOCK_TYPES } from "@/types/helperTypes";

export default function OptionsModalBlock() {
    const [inputValue, setInputValue] = useState('');
    const [fileValue, setFileValue] = useState<File | null>(null);
    const [descriptionValue, setDescriptionValue] = useState('');

    const modalUpload = useAppStore(state => state.modalUpload);
    const selectedBlock = useAppStore(state => state.selectedBlock);
    const addRadioBlock = useAppStore(state => state.addRadioBlock);
    const openModal = useAppStore(state => state.openModal);
    const closeModalUpload = useAppStore(state => state.closeModalUpload);

    const handleConfirm = () => {
        if (!selectedBlock || !inputValue) return;
        addRadioBlock(selectedBlock, inputValue, descriptionValue, fileValue ?? undefined);
        setInputValue('');
        setDescriptionValue('');
        setFileValue(null);
        closeModalUpload();
    }

    const handleCancel = () => {
        setInputValue('');
        closeModalUpload();
        setDescriptionValue('');
        openModal();
    }

    const renderInput = () => {
        if (selectedBlock === BLOCK_TYPES.QUOTE) {
            return (
                <textarea value={inputValue} onChange={e => setInputValue(e.target.value)}
                    placeholder="Escribe tu cita..." className="w-full bg-gray-700 text-white rounded-lg p-3 outline-none resize-none"
                />
            );
        }

        if (selectedBlock === BLOCK_TYPES.IMAGE || selectedBlock === BLOCK_TYPES.VIDEO) {
            return (
                <div className="flex flex-col">
                    <input type="file" accept={selectedBlock === BLOCK_TYPES.IMAGE ? `${BLOCK_TYPES.IMAGE}/*` : `${BLOCK_TYPES.VIDEO}/*`}
                        onChange={e => { const file = e.target.files?.[0]; 
                            if (file) {
                                setInputValue(URL.createObjectURL(file)); setFileValue(file); 
                            }
                        }}
                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-400 mb-2"
                    />

                    {selectedBlock === BLOCK_TYPES.IMAGE && (
                        <input type="text" value={descriptionValue} onChange={e => setDescriptionValue(e.target.value)} placeholder="Describe la imagen (opcional)"
                        className="mt-2 bg-gray-700 text-white placeholder:text-gray-500 border border-gray-600 focus:ring-blue-500 focus:outline-none rounded-xl p-2" />
                    )}
                </div>
            );
        }
    }

    return (
        <Dialog open={modalUpload} onClose={handleCancel} className="relative z-10">
            <DialogBackdrop transition className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                        <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                                    <InformationCircleIcon aria-hidden="true" className="size-6 text-blue-400" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <DialogTitle as="h3" className="text-base font-semibold text-white mb-5">
                                        Sube aquí tu {selectedBlock}
                                    </DialogTitle>
                                    {renderInput()}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row justify-end sm:px-6">
                            <button type="button" data-autofocus onClick={handleCancel}
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                            >
                                Cancelar
                            </button>
                            <button type="button" onClick={handleConfirm} disabled={!inputValue}
                                className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-400 sm:ml-3 sm:w-auto transition-colors"
                            >
                                Añadir
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}