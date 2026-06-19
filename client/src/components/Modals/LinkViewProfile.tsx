"use client";

import { useState } from "react";
import Button from "../utils/Button";
import type { iUser } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import DialogModalNotAccount from "../utils/DialogModalNotAccount";

interface iLinkViewProfileModal {
    user : iUser
}

export default function LinkViewProfile({ user } : iLinkViewProfileModal ) {
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
                    <Button url={`/perfil/${user._id}`} icon={<UserIcon className="w-5 h-5 inline mr-2"/>}>
                        Ver Perfil 
                    </Button>
                ) : (
                    <button onClick={handleOpen} className="w-full sm:w-auto">
                        <Button url={'#'} icon={<UserIcon className="w-5 h-5 inline mr-2"/>}>
                            Ver Perfil 
                        </Button>
                    </button>
                )
            }
            <DialogModalNotAccount open={open} handleClose={handleClose} />
        </div>
    );
}