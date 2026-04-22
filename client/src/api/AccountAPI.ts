import api from "@/lib";
import type { iAccount } from "@/types/types";
import { isAxiosError } from "axios";

const axiosError = (error : unknown) => {
    if(isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
    }
}

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