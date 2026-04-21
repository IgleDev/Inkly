import type { tBlockType } from "./types";

// Region 
export type iRegionSelect = {
  value : string,
  name : string,
  flag : string
}

// Blocks
export const BLOCK_TYPES = {
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
  IMAGE: 'image',
  VIDEO: 'video',
  QUOTE: 'quote'
} as const;

export interface iBlockSelect {
  type : tBlockType,
  description? : string, // Para bloques como imagenes, donde podemos agregar una descripción adicional
  value : string, // Texto, URL, etc...
  file? : File;
  order : number // Manter o orden dos blocos no post
}

export const BlockSelection: { [key: string]: string } = {
  heading: 'Título',
  paragraph: 'Párrafo',
  image: 'Imagen',
  video: 'Video',
  quote: 'Cita'
};

export interface iBlogFormData {
  title: string;
  description: string;
  tags: string[];
  published : boolean;
  reg : string;
  post: {
    blocks: {
      type: tBlockType;
      value: any;
      order: number;
    }[];
  };
}