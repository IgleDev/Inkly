import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

interface iDialogModalNotAccount {
    open : boolean;
    handleClose : (createAccount : boolean) => void;
}

export default function DialogModalNotAccount({ open, handleClose } : iDialogModalNotAccount) {
  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10 w-full">
      <DialogBackdrop transition className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-[#F6F4F0] text-left shadow-xl outline 
                    -outline-offset-1 outline-white/10 transition-all sm:my-8 sm:w-full sm:max-w-2xl min-h-[500px] data-closed:translate-y-4
                    data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0
                    data-closed:sm:scale-95">
                    <div className="bg-[#F6F4F0] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:flex-col sm:items-start sm:justify-between">
                            <div className="flex items-center">
                                <div className="mx-auto flex size-40 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                                    <ExclamationTriangleIcon aria-hidden="true" className="size-8 text-[#C53F56]" />
                                </div>
                                <DialogTitle as="h3" className="font-bold ml-5 text-3xl text-[#C53F56]">
                                    NO TIENES UNA CUENTA CREADA
                                </DialogTitle>
                            </div>
                            <div className="mt-10 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <div className="mt-10">
                                    <p className="text-xl/8 text-gray-500 mb-10">
                                        <span className="font-bold">¡Crea una cuenta!</span>
                                        <br />
                                        No puedes acceder a tu perfíl si no tienes cuenta
                                        anteriormente. ¿¡Cómo esperas conseguir reconomiento si
                                        eres un completo anónimo!? En Inkly ya te damos muchas
                                        libertades, es hora de que nos muestres un poquito de tí!
                                        Siempre puedes elegir ser un anónimo más, pero en esta
                                        plataforma no queremos que seas alguien más, queremos que
                                        tus pensamientos lleguen a más gente que piensa igual que
                                        tú y que no tiene la suficiente voz como para ser
                                        escuchada.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 sm:flex sm:flex-row justify-end sm:px-6">
                        <button type="button" data-autofocus onClick={() => handleClose(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-lg font-semibold text-white inset-ring inset-ring-white/5 hover:bg-gray-600 sm:mt-0 sm:w-auto">
                            Sigo anónimo
                        </button>
                        <button type="button" onClick={() => handleClose(true)} className="inline-flex w-full justify-center rounded-md bg-[#C53F56] px-3 py-2 text-lg font-semibold text-white hover:bg-[#b93b50] sm:ml-3 sm:w-auto transition-colors">
                            Crear Cuenta
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
  );
}
