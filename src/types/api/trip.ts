export interface TripListParams {
  page: number;
  limit: number;
  search: string;
  status?: "PENDING" | "ACTIVE" | "COMPLETED";
  sortBy: string;
  sortOrder: "asc" | "desc";
}
