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
    addRadioBlock : (blockType : tBlockType, inputValue : string) => void,
    updateBlock : (order : number, value : string) => void,
    modal : boolean,
    openModal : () => void,
    closeModal : () => void,
    modalUpload: boolean,
    openModalUpload: () => void,
    closeModalUpload: () => void,
}

export const createBlogSlice : StateCreator<iBlogState> = (set) => ({
    blogDraft: { title : '', description : ''},
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
    addRadioBlock : (blockType : tBlockType, inputValue : string) => {
        set((state) => {
            const newBlock: iBlockSelect = {
                type: blockType,
                value: inputValue,
                order: state.blocks.length
            };

            return {
                blocks: [...state.blocks, newBlock],
                selectedBlock : null
            };
        });
    },
    updateBlock : (order : number, value : string) => {
        set((state) => ({
            blocks : state.blocks.map(block => block.order === order ? {...block, value } : block)
        }))
    },
    modal : false,
    openModal : () => set({modal : true}),
    closeModal : () => set({modal : false}),
    modalUpload : false,
    openModalUpload : () => set({modalUpload : true}),
    closeModalUpload : () => set({modalUpload : false, selectedBlock : null}),
});