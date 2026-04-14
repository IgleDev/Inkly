import { REGION_STORAGE_KEY } from "@/config/config";

export const getRegion = () => {
  const stored = localStorage.getItem(REGION_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};