export interface StudentListParams {
  page: number;
  limit: number;
  search: string;
  busId?: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}
