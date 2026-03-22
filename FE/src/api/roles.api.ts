import { getApiClient } from "@/lib/axios";
import { GetServerSidePropsContext } from "next";

export const getRolesData = async (context: GetServerSidePropsContext) => {
  const api = getApiClient(context);
  const response = await api.get("/api/user/roles");
  return response.data;
};