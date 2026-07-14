import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axiosClient from "@/lib/axios";
import { APIResponse } from "@/types/api";
import { DashboardStatsResponse } from "@/types/models/bus";
import { ActiveBusResponse } from "@/types/models/active-bus";
import { LocationResponse } from "@/types/models/location";

export const getDashboardStats = async () => {
  const res = await axiosClient.get<APIResponse<DashboardStatsResponse>>(
    API_ENDPOINTS.DASHBOARD.STATS,
  );

  return res.data;
};

export const getActiveBuses = async () => {
  const res = await axiosClient.get<APIResponse<ActiveBusResponse[]>>(
    API_ENDPOINTS.DASHBOARD.ACTIVE_BUSES,
  );

  return res.data;
};

export const getBusLocation = async (id: string) => {
  const res = await axiosClient.get<APIResponse<LocationResponse>>(
    API_ENDPOINTS.DASHBOARD.BUS_LOCATION(id),
  );

  return res.data;
};
