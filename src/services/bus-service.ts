import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axiosClient from "@/lib/axios";
import { APIResponse } from "@/types/api";
import { BusListParams } from "@/types/api/bus";
import {
  BusDetailResponse,
  BusSummaryResponse,
  BusUpdateRequest,
} from "@/types/models/bus";

export const listBuses = async (params: BusListParams) => {
  const res = await axiosClient.get<APIResponse<BusSummaryResponse[]>>(
    API_ENDPOINTS.BUS.BASE,
    { params }
  );

  return res.data;
};

export const getBusById = async (id: string) => {
  const res = await axiosClient.get<APIResponse<BusDetailResponse>>(
    API_ENDPOINTS.BUS.BY_ID(id)
  );

  return res.data;
};

export const updateBus = async (id: string, data: BusUpdateRequest) => {
  const res = await axiosClient.put<APIResponse<BusDetailResponse>>(
    API_ENDPOINTS.BUS.BY_ID(id),
    data
  );

  return res.data;
};
