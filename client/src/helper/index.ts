import { isAxiosError } from "axios";
import { AUTH_TOKEN, REGION_STORAGE_KEY } from "@/config/config";

export const getRegion = () => {
  const stored = localStorage.getItem(REGION_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const axiosError = (error : unknown) => {
  if(isAxiosError(error) && error.response) {
    throw new Error(error.response.data.error);
  }
}

export const getToken = () : string | null => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return token;
}