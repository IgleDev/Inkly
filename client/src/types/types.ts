import { z } from "zod"
import type { userSchema } from "@/schema/schemas"

// Usuarios
export type iUser = z.infer<typeof userSchema>;
export type iUserFormLogin = Pick<iUser, 'email' | 'password'>;
export type iUserForm = Pick<iUser, 'name' | 'secondName' | 'email' | 'password' | 'reg'>;


export type iRegionSelect = {
    value : string,
    name : string,
    flag : string
}

// Block
type tBlockType = 'paragraph' | 'heading' | 'image' | 'video' | 'quote';
export interface iBlockSelect {
    type : tBlockType,
    value : string, // Texto, URL, etc...
    order : number // Manter o orden dos blocos no post
}

export const BlockSelection: { [key: string]: string } = {
    HEADING: 'Título',
    PARAGRAPH: 'Párrafo',
    IMAGE: 'Imagen',
    VIDEO: 'Video',
    QUOTE: 'Cita'
};