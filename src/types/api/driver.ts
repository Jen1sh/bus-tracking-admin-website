export interface DriverListParams {
  page: number;
  limit: number;
  search: string;
  status: "ACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION";
  sortBy: string;
  sortOrder: "asc" | "desc";
}
