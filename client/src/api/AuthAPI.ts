import api from "@/lib";
import type { iUserFormData, iUserFormLogin } from "@/types/types";
import { userSchema } from "@/schema/schemas";
import { axiosError } from "@/helper";

export async function createAccount(formData : iUserFormData) {
    try {
        const url = `/users`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        axiosError(error);
    }
}

export async function loginAccount(formData : iUserFormLogin) {
    try {
        const url = '/users/login';
        const { data } = await api.post<string>(url, formData);
        return data;    
    } catch (error) {
        axiosError(error);
    }
}

export async function getUser() {
    try {
        const { data } = await api.get('/users/user')
        const response = userSchema.safeParse(data);
        if(response.success) {
            return response.data;
        }
        return data;
    } catch (error) {
        axiosError(error);
    }
}