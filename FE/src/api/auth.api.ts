// api/auth.api.ts
import { getApiClient } from "@/lib/axios";
import { GetServerSidePropsContext } from "next";

export const login = async () => {
  const api = getApiClient();
  const response = await api.post("/api/auth/login");
  return response.data;
};