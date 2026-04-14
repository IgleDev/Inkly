import api from "@/lib";
import type { iBlogFormData } from "@/types/helperTypes";
import { isAxiosError } from "axios";

export async function createBlog(formData : iBlogFormData) {
    try {
        const url = '/blog/create';
        const { data } = await api.post(url, formData);

        if(!data) {
            throw new Error('No se ha podido crear el blog');
        }
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getAllBlogs() {
    try {
        const url = '/blog/';
        const { data } = await api.get(url);
        
        if(!data) {
            throw new Error('No se han podido obtener los blogs');
        }
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}