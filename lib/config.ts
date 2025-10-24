export const API_URL = process.env.NEXT_PUBLIC_API_URL 

export const getApiUrl = (path: string) => {
    return `${API_URL}${path}`;
};