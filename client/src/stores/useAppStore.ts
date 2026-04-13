import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createBlogSlice, type iBlogState } from "./BlogSlice";

export const useAppStore = create<iBlogState>()(
    devtools((...a) => ({
        ...createBlogSlice(...a),
})))