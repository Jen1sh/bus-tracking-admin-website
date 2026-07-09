export interface RouteRequest {
  name: string;
  code?: string;
  busId: number;
}

export interface RouteResponse {
  id: number;
  code: string;
  name: string;
  busId: number | null;
  busCapacity: number | null;
  stopCount: number;
}
