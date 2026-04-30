import { isAxiosError } from "axios";
import { AUTH_TOKEN, REGION_STORAGE_KEY } from "@/config/config";

export const getRegion = () => {
  const stored = localStorage.getItem(REGION_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export function formatDate(dateString : string) : string {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('es-ES', {
      year : 'numeric',
      month : 'long',
      day : 'numeric'
    })
    return formatter.format(date);
};
  
export const axiosError = (error : unknown) => {
  if(isAxiosError(error) && error.response) {
    throw new Error(error.response.data.error);
  }
};

export const getToken = () : string | null => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return token;
};

export const maxLengths = {
  BLOG_TITLE : 50,
  BLOG_DESCRIPTION : 280,
  BLOCK_PARAGRAPH : 560,
  BLOCK_QUOTE : 280,
  BLOCK_TAG : 20,
  BLOCK_IMAGE_DESCRIPTION : 100
}