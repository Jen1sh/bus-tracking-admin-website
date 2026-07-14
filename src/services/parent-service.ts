import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axiosClient from "@/lib/axios";
import { APIResponse, PaginatedResponse } from "@/types/api";
import { ParentListParams } from "@/types/api/parent";
import { ParentUserRequest, ParentUserResponse } from "@/types/models/parent";

export const listParents = async (params: ParentListParams) => {
  const res = await axiosClient.get<PaginatedResponse<ParentUserResponse>>(
    API_ENDPOINTS.PARENT.BASE,
    { params }
  );

  return res.data;
};

export const getParentById = async (id: string) => {
  const res = await axiosClient.get<APIResponse<ParentUserResponse>>(
    API_ENDPOINTS.PARENT.BY_ID(id)
  );

  return res.data;
};

export const addParent = async (data: ParentUserRequest) => {
  const res = await axiosClient.post(API_ENDPOINTS.PARENT.BASE, data);

  return res.data;
};

export const updateParent = async (id: string, data: ParentUserRequest) => {
  const res = await axiosClient.put(API_ENDPOINTS.PARENT.BY_ID(id), data);

  return res.data;
};

export const deleteParent = async (id: string) => {
  const res = await axiosClient.delete(API_ENDPOINTS.PARENT.BY_ID(id));

  return res.data;
};
