import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createBlogSlice, type iBlogState } from "./BlogSlice";
import { createRegSlice, type iRegState } from "./RegSlice";
import { REGION_STORAGE_KEY } from "@/config/config";

type Store = iBlogState & iRegState;

export const useAppStore = create<Store>()(
    devtools(
        persist(
            (...a) => ({
                ...createBlogSlice(...a),
                ...createRegSlice(...a),
            }),
            {
                name: REGION_STORAGE_KEY,
                partialize: (state) => ({
                    regSelect: state.regSelect
                })
            }
        )
    )
);