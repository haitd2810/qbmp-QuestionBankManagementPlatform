// api/auth.api.ts
import { axiosInstance } from "@/lib/axios";

export const login = async () => {
  const response = await axiosInstance.post("/api/auth/login");
  return response.data;
};