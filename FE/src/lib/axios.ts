import axios from "axios";

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendError = error.response?.data;
    if (error.response?.status === 401) {
      setAccessToken(null);
      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    }
    return Promise.reject(backendError || error);
  }
);