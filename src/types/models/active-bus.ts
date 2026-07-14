export interface CurrentTrip {
  tripId: number;
  driverId: number;
  startTime: string;
  status: string;
}

export interface ActiveBusResponse {
  busId: number;
  plate: string;
  capacity: number;
  schoolId: number;
  driverName: string;
  driverPhone: string;
  studentCount: number;
  currentTrip: CurrentTrip;
}
