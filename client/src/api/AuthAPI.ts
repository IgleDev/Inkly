import api from "@/lib";
import { isAxiosError } from "axios";
import type { iUserForm, iUserFormLogin } from "@/types/types";
import { userSchema } from "@/schema/schemas";

const axiosError = (error : unknown) => {
    if(isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
    }
}

export async function createAccount(formData : iUserForm) {
    try {
        const url = `/users`;
        console.log(formData);
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