export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",

  BUS: {
    LOCATION_BY_BUS: (id: string) => `location/bus/${id}`,
  },
} as const;
