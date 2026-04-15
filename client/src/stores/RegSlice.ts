import type { iRegionSelect } from '@/types/helperTypes';
import type { StateCreator } from "zustand";

export interface iRegState {
    regSelect : iRegionSelect,
    regFilter : iRegionSelect,
    updateRegSelect : (reg : iRegionSelect) => void,
    updateRegFilter : (reg : iRegionSelect) => void,
}

export const createRegSlice : StateCreator<iRegState> = (set) => ({
    regSelect : { value : '', name : '', flag : '' },
    updateRegSelect : (reg) => {
        set({ regSelect : reg })
    },
    regFilter: { value: '', name: '', flag: '' },
    updateRegFilter: (reg) => {
        set({ regFilter : reg });
    },
})
