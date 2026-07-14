import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axiosClient from "@/lib/axios";
import { APIResponse, PaginatedResponse } from "@/types/api";
import { TripListParams } from "@/types/api/trip";
import {
  CreateTripRequest,
  UpdateTripRequest,
  TripResponse,
  BulkDeleteRequest,
} from "@/types/models/trip";

export const listTrips = async (params: TripListParams) => {
  const res = await axiosClient.get<PaginatedResponse<TripResponse>>(
    API_ENDPOINTS.TRIP.BASE,
    { params }
  );

  return res.data;
};

export const getTripById = async (id: string) => {
  const res = await axiosClient.get<APIResponse<TripResponse>>(
    API_ENDPOINTS.TRIP.BY_ID(id)
  );

  return res.data;
};

export const createTrip = async (data: CreateTripRequest) => {
  const res = await axiosClient.post(API_ENDPOINTS.TRIP.BASE, data);

  return res.data;
};

export const updateTrip = async (id: string, data: UpdateTripRequest) => {
  const res = await axiosClient.put(API_ENDPOINTS.TRIP.BY_ID(id), data);

  return res.data;
};

export const deleteTrip = async (id: string) => {
  const res = await axiosClient.delete(API_ENDPOINTS.TRIP.BY_ID(id));

  return res.data;
};

export const bulkDeleteTrips = async (data: BulkDeleteRequest) => {
  const res = await axiosClient.delete(API_ENDPOINTS.TRIP.BASE, { data });

  return res.data;
};
