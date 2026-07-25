import axios from "axios";
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { useUserStore } from "../store/useUserStore";

const publicApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useUserStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error: AxiosError) => {
    if (error.response?.status === 401) {
        useUserStore.getState().clearUser();
    }
    return Promise.reject(error);
});

export { publicApiClient, apiClient };