export interface DriverUserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  schoolId: number;
  accountStatus?: string;
}

export interface DriverUserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  accountStatus: string;
  phone: string;
  schoolId: number | null;
  createdAt: string;
}
