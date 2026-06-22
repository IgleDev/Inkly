import api from "@/lib";
import type { iBlogRead } from "@/types/types";
import { axiosError, getToken } from "@/helper";
import type { iBlogFormData } from "@/types/helperTypes";
import { blogReadSchema, blogsResponseSchema, TeamBlogsResponseSchema } from "@/schema/schemas";

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

export async function getAllBlogs(reg: string) {
    try {
        const url = "/blog/";
        const { data } = await api.get(url, {
            params: { reg }
        });

        const response = blogsResponseSchema.safeParse(data);

        if (!response.success) {
            throw new Error("Respuesta inválida");
        }

        return response.data;
    } catch (error) {
        throw axiosError(error);
    }
}

export async function getBlogsByTags(reg : string, tag : string) {
    try {
        const url = '/blog/filter-by-tags';
        const { data } = await api.get(url, {
            params : { reg, tag }
        })
        const response = blogsResponseSchema.safeParse(data);
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        axiosError(error);
    }
}

export async function getBlogById(id : string) {
    try {
        const url = `/blog/${id}`;
        const { data } = await api.get<iBlogRead>(url);
        const response = blogReadSchema.safeParse(data);
        if (!response.success) {
            console.error(response.error.format()); // verás exactamente qué campo falla
            throw new Error('Respuesta del servidor no válida');
        }
return response.data;
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

export async function saveBlog(blogId : string) {
    try {
        const url = '/blog/save-blog';
        const { data } = await api.post(url, { blogId }, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        });
        return data;
    } catch (error) {
        axiosError(error);
    }
}

export async function getBlogsTeam() {
    try {
        const token = getToken();
        const url = '/blog/get-team-blogs';
        const { data } = await api.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const response = TeamBlogsResponseSchema.parse(data);
        return response.blogs;
    } catch (error) {
        axiosError(error);
        return [];
    }
}