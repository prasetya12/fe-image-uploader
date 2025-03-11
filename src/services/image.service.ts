import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`${API_BASE_URL}/images/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const getImages = async () => {
    const response = await axios.get(`${API_BASE_URL}/images`);
    return response?.data?.data;
};

export const downloadImage = async (filename: string) => {
    const response = await axios.get(`${API_BASE_URL}/images/download/${filename}`, {
        responseType: "blob",
    });

    const blob = new Blob([response.data], { type: response.headers["content-type"] });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
};