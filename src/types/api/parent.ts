export interface ParentListParams {
  page: number;
  limit: number;
  search: string;
  status?: "ACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION";
  sortBy: string;
  sortOrder: "asc" | "desc";
}
