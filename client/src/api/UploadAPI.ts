import axios from "axios";

export interface Block {
    type: string;
    file?: File;
    value?: string;
}

export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/uploads`,
        formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return res.data.url;
};