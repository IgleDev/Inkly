import type { iBlogPresentation, tBlockType } from "@/types/types";
import type { iBlockSelect } from '@/types/helperTypes';
import type { StateCreator } from "zustand";

export interface iBlogState {
    blogDraft: iBlogPresentation,
    updateTitleBlock: (value: string) => void;
    updateDescription: (desc: string) => void,
    blocks : iBlockSelect[],
    selectedBlock : tBlockType | null,
    selectRadioBlock : (blockType : tBlockType) => void,
    addRadioBlock : (blockType : tBlockType, inputValue : string, description : string, file? : File) => void,
    updateBlock : (order : number, value : string, file? : File) => void,
    modal : boolean,
    openModal : () => void,
    closeModal : () => void,
    modalUpload: boolean,
    openModalUpload: () => void,
    closeModalUpload: () => void,
    modalBack : boolean,
    openModalBack : () => void,
    closeModalBack : () => void,
    modalTags : boolean,
    openModalTags : () => void,
    closeModalTags : () => void,
    tags : string[],
    setTags : (tags : string[]) => void,
    clearFunction : () => void,
}

export const createBlogSlice : StateCreator<iBlogState> = (set, get) => ({
    blogDraft: { _id : '', title : '', description : '', tags : []},
    updateTitleBlock: (value: string) => {
        set((state) => ({
            blocks: state.blocks.map(block => 
                block.type === 'heading' ? { ...block, value } : block
            )
        }));
    },
    updateDescription: (desc: string) => {
        set((state) => ({
            blogDraft: { ...state.blogDraft, description: desc }
        }));
    },
    blocks : [],
    selectedBlock : null,
    selectRadioBlock: (blockType: tBlockType) => {
        set({
            selectedBlock: blockType
        });
    },
    addRadioBlock : (blockType : tBlockType, inputValue : string, description : string, file? : File) => {
        set((state) => {
            const newBlock: iBlockSelect = {
                type: blockType,
                value: inputValue,
                description : description || '',
                file: file,
                order: state.blocks.length
            };

            return {
                blocks: [...state.blocks, newBlock],
                selectedBlock : null
            };
        });
    },
    updateBlock : (order : number, value : string, file? : File) => {
        set((state) => ({
            blocks : state.blocks.map(block => block.order === order ? {...block, value, ...(file && { file }) } : block)
        }))
    },
    modal : false,
    openModal : () => set({modal : true}),
    closeModal : () => set({modal : false}),
    modalUpload : false,
    openModalUpload : () => set({modalUpload : true}),
    closeModalUpload : () => set({modalUpload : false, selectedBlock : null}),
    modalBack : false,
    openModalBack : () => set({ modalBack : true }),
    closeModalBack : () => {
        set({ modalBack : false });
        get().clearFunction();
    },
    modalTags : false,
    openModalTags : () => set({ modalTags : true }),
    closeModalTags : () => set({ modalTags : false }),
    tags : [],
    setTags : (tags) => set({ tags }),
    clearFunction : () => set({
        blocks : [], 
        blogDraft : { _id : '', title : '', description : '', tags : []},
        tags : [],
        selectedBlock : null
    }),
});