import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface iLoadingModalProps {
    isOpen: boolean;
    message?: string;
}

export default function LoadingModal({ isOpen, message = "Procesando..." }: iLoadingModalProps) {
    return (
        <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/60 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />
            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in w-full max-w-sm p-8"
                    >
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div
                                className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#3764e2]"
                                aria-hidden="true"
                            />
                            <p className="text-base font-semibold text-white">{message}</p>
                            <p className="text-sm text-gray-400">No cierres ni recargues la página.</p>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}