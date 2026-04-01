// lib/axios.ts
import axios from "axios";
import Cookies from "js-cookie";
import { GetServerSidePropsContext } from "next";

export const getApiClient = (ctx?: GetServerSidePropsContext) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    let token;

    if (typeof window !== "undefined") {
      token = Cookies.get("token");
    } else if (ctx?.req) {
      token = ctx.req.cookies["token"];
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};
