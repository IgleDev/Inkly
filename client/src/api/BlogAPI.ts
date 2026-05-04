import api from "@/lib";
import type { iBlogRead } from "@/types/types";
import { axiosError, getToken } from "@/helper";
import type { iBlogFormData } from "@/types/helperTypes";

export async function createBlog(formData : iBlogFormData) {
    try {
        const url = '/blog/create';
        const { data } = await api.post(url, formData, {
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${getToken()}`
            }
        });

        if(!data) {
            throw new Error('No se ha podido crear el blog');
        }
        return data;
    } catch (error) {
       axiosError(error);
    }
}

export async function getAllBlogs(reg : string) {
    try {
        const url = '/blog/';
        const { data } = await api.get(url, {
            params : { reg }
        });
        
        if(!data) {
            throw new Error('No se han podido obtener los blogs');
        }
        return data;
    } catch (error) {
        axiosError(error);
    }
}

export async function getBlogsByTags(reg : string, tag : string) {
    try {
        const url = '/blog/filter-by-tags';
        const { data } = await api.get(url, {
            params : { reg, tag }
        })
        return data;
    } catch (error) {
        axiosError(error);
    }
}

export async function getBlogById(id : string) {
    try {
        const url = `/blog/${id}`;
        const { data } = await api.get<iBlogRead>(url, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        });
        return data;
    } catch (error) {
        axiosError(error);
    }
}

export async function updateBlog(id : string, formData : iBlogFormData) {
    try {
        const url = `/blog/edit-blog-published/${id}`;
        const { data } = await api.put(url, formData, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        })
        return data;
    } catch (error) {
        axiosError(error);
    }
}

export async function deleteBlog(id : string) {
    try {
        const url = `/blog/delete/${id}?deleteBlog=true`;
        const { data } = await api.delete(url, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        });
        return data;
    } catch (error) {
        axiosError(error);
    }
}