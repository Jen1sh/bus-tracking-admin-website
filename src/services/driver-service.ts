import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axiosClient from "@/lib/axios";
import { APIResponse, PaginatedResponse } from "@/types/api";
import { DriverListParams } from "@/types/api/driver";
import { DriverUserRequest, DriverUserResponse } from "@/types/models/driver";

export const listDrivers = async (params: DriverListParams) => {
  const res = await axiosClient.get<PaginatedResponse<DriverUserResponse>>(
    API_ENDPOINTS.DRIVER.BASE,
    { params }
  );

  return res.data;
};

export const addDriver = async (data: DriverUserRequest) => {
  const res = await axiosClient.post(API_ENDPOINTS.DRIVER.BASE, data);

  return res.data;
};

export const getDriverById = async (id: string) => {
  const res = await axiosClient.get<APIResponse<DriverUserResponse>>(
    API_ENDPOINTS.DRIVER.BY_ID(id)
  );

  return res.data;
};

export const deleteDriverById = async (id: string) => {
  const res = await axiosClient.delete(API_ENDPOINTS.DRIVER.BY_ID(id));

  return res.data;
};

export const updateDriver = async (id: string, data: DriverUserRequest) => {
  const res = await axiosClient.put(API_ENDPOINTS.DRIVER.BY_ID(id), data);

  return res.data;
};
