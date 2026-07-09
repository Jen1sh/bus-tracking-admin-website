import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axiosClient from "@/lib/axios";
import { APIResponse } from "@/types/api";
import { BusListParams } from "@/types/api/bus";
import { BusSummaryResponse } from "@/types/models/bus";

export const listBuses = async (params: BusListParams) => {
  const res = await axiosClient.get<APIResponse<BusSummaryResponse[]>>(
    API_ENDPOINTS.BUS.BASE,
    { params }
  );

  return res.data;
};
