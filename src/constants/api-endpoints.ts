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
    UNASSIGNED_BUSES: "admin/bus-management/unassigned-buses",
    UNASSIGNED_USERS: "admin/bus-management/unassigned-users",
  },

  STUDENT: {
    BASE: "admin/students",
    BY_ID: (id: string) => `admin/students/${id}`,
  },
  PARENT: {
    BASE: "admin/parents",
    BY_ID: (id: string) => `admin/parents/${id}`,
  },

  DASHBOARD: {
    STATS: "admin/dashboard/stats",
    ACTIVE_BUSES: "admin/active-buses",
    BUS_LOCATION: (id: string) => `admin/buses/${id}/location`,
  },

  TRIP: {
    BASE: "admin/trips",
    BY_ID: (id: string) => `admin/trips/${id}`,
  },
} as const;
