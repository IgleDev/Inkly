import { axiosError } from "@/helper";
import api from "@/lib";
import type { iAccount } from "@/types/types";

export async function getUserByName(name: string) {
    try {
        const url = `users/user/profile/${encodeURIComponent(name)}`
        const { data } = await api.get<iAccount>(url);
        return data;
    } catch (error) {
        axiosError(error);
    }
}

export async function getUserById(id: string) {
    try {
        const url = `users/user/${id}`;
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        axiosError(error);
    }
}