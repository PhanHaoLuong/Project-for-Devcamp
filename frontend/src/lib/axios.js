import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5000' : 'https://project-for-devcamp-production.vercel.app',
    withCredentials: true,
});