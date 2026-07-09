import { Role, AccountStatus } from "@/types/enums";

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface UserSummary {
  id: number;
  name: string;
  email: string;
  role: Role;
  schoolId: number | null;
  status: AccountStatus;
}

export interface AuthResponse {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  user: UserSummary | null;
  message: string | null;
}

// ─── Super Admin ─────────────────────────────────────────────────────────────

export interface CreateAdminRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  schoolId: number;
}

// ─── Admin Dashboard ─────────────────────────────────────────────────────────

export interface DashboardStatsResponse {
  activeBuses: number;
  totalBuses: number;
  studentsRiding: number;
  onTimePct: number;
}

export interface BusLiveResponse {
  busId: number;
  displayId: string;
  latitude: number;
  longitude: number;
  status: string;
  recordedAt: string;
}

export interface BusSummaryResponse {
  id: number;
  displayId: string;
  plate: string;
  capacity: number | null;
  studentCount: number;
  driverName: string | null;
  driverPhone: string | null;
  status: string;
}

export interface RouteResponse {
  id: number;
  code: string;
  name: string;
  busId: number | null;
  busCapacity: number | null;
  stopCount: number;
}

// ─── Admin Bus Management ────────────────────────────────────────────────────

export interface StudentResponse {
  id: number;
  name: string;
  klass: string | null;
  stop: string | null;
  guardianPhone: string | null;
}

export interface BusDetailResponse {
  id: number;
  displayId: string;
  plate: string;
  capacity: number | null;
  shift: string | null;
  status: string;
  driverName: string | null;
  driverPhone: string | null;
  routeCode: string | null;
  routeName: string | null;
  students: StudentResponse[];
}

export interface BusUpdateRequest {
  capacity?: number | null;
  shift?: string | null;
  status?: string | null;
  driverName?: string | null;
  driverPhone?: string | null;
  routeCode?: string | null;
  routeName?: string | null;
}

export interface PlateChangeAuthorizeRequest {
  password: string;
}

export interface PlateChangeAuthorizeResponse {
  unlockToken: string;
  expiresIn: number;
}

export interface PlateUpdateRequest {
  newPlate: string;
  unlockToken: string;
}

export interface StudentRequest {
  name: string;
  klass?: string | null;
  stop?: string | null;
  guardianPhone?: string | null;
}

// ─── Admin Fleet Import ──────────────────────────────────────────────────────

export interface FleetImportRowResult {
  rowNumber: number;
  ok: boolean;
  error: string | null;
  busDisplayId: string | null;
  plate: string | null;
  capacity: number | null;
  routeCode: string | null;
  routeName: string | null;
  driverName: string | null;
  driverPhone: string | null;
  shift: string | null;
  stops: string[];
}

export interface FleetImportPreviewResponse {
  rows: FleetImportRowResult[];
  okCount: number;
  errorCount: number;
}

export interface FleetImportCommitRequest {
  rows: FleetImportRowResult[];
}

export interface FleetImportCommitResponse {
  importedCount: number;
  skippedCount: number;
}

export interface FleetBulkEditRowResult {
  rowNumber: number;
  ok: boolean;
  error: string | null;
  busId: number | null;
  busDisplayId: string | null;
  capacity: number | null;
  routeCode: string | null;
  routeName: string | null;
  driverName: string | null;
  driverPhone: string | null;
  shift: string | null;
  stops: string[];
}

export interface FleetBulkEditPreviewResponse {
  rows: FleetBulkEditRowResult[];
  okCount: number;
  errorCount: number;
}

export interface FleetBulkEditCommitRequest {
  rows: FleetBulkEditRowResult[];
}

export interface FleetBulkEditCommitResponse {
  updatedCount: number;
  skippedCount: number;
}
