import api from "@/lib";
import { axiosError, getToken } from "@/helper";
import type { iAccount, iUserFormEdit } from "@/types/types";

export async function getUserByName(name: string) {
    try {
        const url = `/users/user/profile/${encodeURIComponent(name)}`
        const { data } = await api.get<iAccount>(url);
        return data;
    } catch (error) {
        axiosError(error);
    }
}

export async function getUserById(id: string) {
    try {
        const url = `/users/user/${id}`;
        const { data } = await api.get<iAccount>(url);
        return data;
    } catch (error) {
        axiosError(error);
    }
}

export async function updateProfile(formData : iUserFormEdit, id : string) {
    try {
        const url = `/users/edit-profile-account/${id}`;
        console.log(url)
        const { data } = await api.put(url, formData, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        });
        return data;
    } catch (error) {
        axiosError(error);
    }
}