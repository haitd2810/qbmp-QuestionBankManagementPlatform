import { axiosInstance } from "@/lib/axios";

export const getSubjectsData = async () => {
  const response = await axiosInstance.get("/api/user/subjects");
  return response.data;
};