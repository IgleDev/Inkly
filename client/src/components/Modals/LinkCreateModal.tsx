"use client";

import { useState } from "react";
import Button from "../utils/Button";
import type { iUser } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import DialogModalNotAccount from "../utils/DialogModalNotAccount";

interface iLinkCreateModal {
    user : iUser
}

export default function LinkCreateModal({ user } : iLinkCreateModal) {
    const [open, IsOpen] = useState<boolean>(false);
    const navigation = useNavigate();

    const handleOpen = () => { IsOpen(true) }
    const handleClose = (creteAccount : boolean) => { 
        if(creteAccount) {
            navigation('/auth/register', { replace : true})
        }
        IsOpen(false)
    }

    return (
        <div className="w-full sm:w-auto">
            {
                user ? (
                    <Button url={'/new/create-blog'} icon={<FolderPlusIcon className="w-5 h-5 inline mr-2"/> }>
                        Crear Blog
                    </Button>
                ) : (
                    <button onClick={handleOpen} className="w-full sm:w-auto">
                        <Button url={'#'} icon={<FolderPlusIcon className="w-5 h-5 inline mr-2"/> }>
                            Crear Blog
                        </Button>
                    </button>
                )
            }
            <DialogModalNotAccount open={open} handleClose={handleClose} />
        </div>
    );
}