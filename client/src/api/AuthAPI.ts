import api from "@/lib";
import { isAxiosError } from "axios";
import type { iUserForm } from "@/types/types";

export async function createAccount(formData : iUserForm) {
    try {
        const url = `/users`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}