export interface LocationResponse {
  busId: number;
  latitude: number;
  longitude: number;
  speed: number;
  recordedAt: string;
  tripStatus: string | null;
}
