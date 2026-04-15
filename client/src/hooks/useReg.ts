import { REGION_STORAGE_KEY } from "@/config/config";
import type { iRegionSelect } from "@/types/helperTypes";

export const useReg = () => {
    const stored = localStorage.getItem(REGION_STORAGE_KEY);

    if(!stored) {
        return { value : '', name : '', flag : ''}
    }

    const parsed: iRegionSelect = JSON.parse(stored);
    const { value, name, flag } = parsed;
    return { value, name, flag };
}