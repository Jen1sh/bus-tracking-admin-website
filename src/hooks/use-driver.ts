import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import { listDrivers, getDriverById } from "@/services/driver-service"
import { getBusManagement } from "@/services/bus-management-service"
import { listBuses } from "@/services/bus-service"
import type { DriverListParams } from "@/types/api/driver"

const useDriver = () => {
  const useDrivers = (params: Omit<DriverListParams, "page">) =>
    useInfiniteQuery({
      queryKey: ["drivers", params],
      queryFn: ({ pageParam }) => listDrivers({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    })

  const useDriverDetail = (id: string) =>
    useQuery({
      queryKey: ["driver", id],
      queryFn: () => getDriverById(id),
      enabled: !!id,
    })

  const useBusAssignments = () =>
    useQuery({
      queryKey: ["bus-assignments"],
      queryFn: () => getBusManagement(),
    })

  const useAllBuses = () =>
    useQuery({
      queryKey: ["buses-summary"],
      queryFn: () => listBuses({ search: "", status: "ongoing" }),
    })

  return { useDrivers, useDriverDetail, useBusAssignments, useAllBuses }
}

export default useDriver
