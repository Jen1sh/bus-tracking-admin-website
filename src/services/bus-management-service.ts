import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axiosClient from "@/lib/axios";
import { APIResponse } from "@/types/api";
import {
  BusDriverAssignmentRequest,
  BusDriverResponse,
  UnassignedBusResponse,
  UnassignedUserResponse,
} from "@/types/models/busManagement";

export const getBusManagement = async () => {
  const res = await axiosClient.get<APIResponse<BusDriverResponse[]>>(
    API_ENDPOINTS.BUS_MANAGEMENT.BASE
  );

  return res.data;
};

export const addBusManagement = async (data: BusDriverAssignmentRequest) => {
  const res = await axiosClient.post(API_ENDPOINTS.BUS_MANAGEMENT.BASE, data);

  return res.data;
};

export const getBusManagementById = async (id: string) => {
  const res = await axiosClient.get<APIResponse<BusDriverResponse>>(
    API_ENDPOINTS.BUS_MANAGEMENT.BY_ID(id)
  );

  return res.data;
};

export const updateBusAssignment = async (id: string) => {
  const res = await axiosClient.delete(API_ENDPOINTS.BUS_MANAGEMENT.BY_ID(id));

  return res.data;
};

export const getUnassignedBuses = async () => {
  const res = await axiosClient.get<APIResponse<UnassignedBusResponse[]>>(
    API_ENDPOINTS.BUS_MANAGEMENT.UNASSIGNED_BUSES
  );

  return res.data;
};

export const getUnassignedDrivers = async () => {
  const res = await axiosClient.get<APIResponse<UnassignedUserResponse[]>>(
    API_ENDPOINTS.BUS_MANAGEMENT.UNASSIGNED_USERS
  );

  return res.data;
};
