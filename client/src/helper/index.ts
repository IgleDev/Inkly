import { REGION_STORAGE_KEY } from "@/config/config";

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
}