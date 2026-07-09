export interface APIResponse<T> {
  success: boolean;
  data: T;
  message: string | null;
  error: string | null;
}

export interface ErrorResponse<T> {
  success: boolean;
  data: T | null;
  message: string | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: { items: T[] };
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
