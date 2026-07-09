import { TripStatus } from '@/types/enums';

export interface CreateTripRequest {
  busId: number;
  driverId: number;
  startTime: string;
  dates: string[];
}

export interface UpdateTripRequest {
  busId?: number;
  driverId?: number;
  startTime?: string;
  date?: string;
  status?: string;
}

export interface TripResponse {
  tripId: number;
  busId: number;
  driverId: number;
  startTime: string;
  endTime: string | null;
  status: TripStatus;
  date: string;
}

export interface BulkDeleteRequest {
  ids: number[];
}
