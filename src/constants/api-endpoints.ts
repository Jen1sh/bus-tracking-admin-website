export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",

  BUS: {
    LOCATION_BY_BUS: (id: string) => `location/bus/${id}`,
    BASE: "admin/buses",
    BY_ID: (id: string) => `admin/buses/${id}`,
  },
  DRIVER: {
    BASE: "admin/drivers",
    BY_ID: (id: string) => `admin/drivers/${id}`,
  },

  BUS_MANAGEMENT: {
    BASE: "admin/bus-management",
    BY_ID: (id: string) => `admin/bus-management/${id}`,
    UNASSIGNED_BUSES: "admin/unassigned-buses",
    UNASSIGNED_USERS: "admin/unassgined-users",
  },
} as const;
