import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getActiveBuses,
  getBusLocation,
} from "@/services/dashboard-service";

const useDashboard = () => {
  const useDashboardStats = () =>
    useQuery({
      queryKey: ["dashboard-stats"],
      queryFn: getDashboardStats,
    });

  const useActiveBuses = () =>
    useQuery({
      queryKey: ["active-buses"],
      queryFn: getActiveBuses,
    });

  const useBusLocation = (busId?: string) =>
    useQuery({
      queryKey: ["bus-location", busId ?? "none"],
      queryFn: () => getBusLocation(busId!),
      enabled: !!busId,
      refetchInterval: 2500,
    });

  return { useDashboardStats, useActiveBuses, useBusLocation };
};

export default useDashboard;
