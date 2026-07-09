import { DriverUserResponse } from './driver';

export interface ParentUserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  schoolId?: number;
  childrenIds?: number[];
}

export type ParentUserResponse = DriverUserResponse;
