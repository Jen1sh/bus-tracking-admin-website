import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axiosClient from "@/lib/axios";
import type { APIResponse } from "@/types/api";
import type { AuthResponse, LoginRequest } from "@/types/models/bus";

export const loginUser = async (data: LoginRequest) => {
  const res = await axiosClient.post<APIResponse<AuthResponse>>(
    API_ENDPOINTS.LOGIN,
    data
  );

  return res.data;
};

export const logoutUser = async (): Promise<void> => {
  await new Promise((r) => setTimeout(r, 200));
};

export const refreshToken = async (): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.REFRESH}`,
    { method: "POST", credentials: "include" }
  );

  if (!response.ok) {
    throw new Error("Token refresh failed");
  }

  const data = await response.json();
  return data.token as string;
};
