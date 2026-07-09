export interface StudentRequest {
  name: string;
  schoolId: number;
  busId?: number;
  klass?: string | null;
  stop?: string | null;
  guardianPhone?: string | null;
}

export interface StudentResponse {
  id: number;
  name: string;
  klass: string | null;
  stop: string | null;
  guardianPhone: string | null;
}
