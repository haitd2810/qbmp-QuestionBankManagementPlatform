import { axiosInstance } from "@/lib/axios";

export const getRolesData = async () => {
  const response = await axiosInstance.get("/api/user/roles");
  return response.data;
};