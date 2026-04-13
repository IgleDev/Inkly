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
export const BLOCK_TYPES = {
    HEADING: 'heading',
    PARAGRAPH: 'paragraph',
    IMAGE: 'image',
    VIDEO: 'video',
    QUOTE: 'quote'
} as const;

export type tBlockType = typeof BLOCK_TYPES[keyof typeof BLOCK_TYPES];
export interface iBlockSelect {
    type : tBlockType,
    value : string, // Texto, URL, etc...
    order : number // Manter o orden dos blocos no post
}

export const BlockSelection: { [key: string]: string } = {
    heading: 'Título',
    paragraph: 'Párrafo',
    image: 'Imagen',
    video: 'Video',
    quote: 'Cita'
};