export interface BusDriverAssignmentRequest {
  userId: number;
  busId: number;
  license: string;
}

export interface BusDriverResponse {
  id: number;
  userId: number;
  userName: string;
  busId: number;
  busPlate: string;
  license: string;
}

export interface UnassignedBusResponse {
  id: number;
  plate: string;
  capacity: number;
  schoolId: number;
  displayId: string;
}

export interface UnassignedUserResponse {
  id: number;
  name: string;
  email: string;
  schoolId: number | null;
}
