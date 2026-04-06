type tBlockType = 'paragraph' | 'heading' | 'image' | 'video' | 'quote';

export interface iBlock {
    type : tBlockType,
    value : string, // Texto, URL, etc...
    order : number // Manter o orden dos blocos no post
}