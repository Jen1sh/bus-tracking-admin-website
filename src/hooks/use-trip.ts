import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  listTrips,
  getTripById,
  toggleCancelTrip,
  getActiveTripByBus,
} from "@/services/trip-service"
import type { TripListParams } from "@/types/api/trip"
import { toast } from "sonner"

const useTrip = () => {
  const qc = useQueryClient()

  const useTripList = (params?: TripListParams) =>
    useQuery({
      queryKey: ["trips", params],
      queryFn: () => listTrips(params),
    })

  const useTripDetail = (id?: number | string) =>
    useQuery({
      queryKey: ["trip", id ?? "none"],
      queryFn: () => getTripById(id!),
      enabled: !!id,
    })

  const useActiveTripByBus = (busId?: number | string) =>
    useQuery({
      queryKey: ["active-trip", busId ?? "none"],
      queryFn: () => getActiveTripByBus(busId!),
      enabled: !!busId,
    })

  const useToggleCancelTrip = () =>
    useMutation({
      mutationFn: (id: number | string) => toggleCancelTrip(id),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["trips"] })
        toast.success("Trip status toggled")
      },
      onError: () => toast.error("Failed to toggle trip"),
    })

  return {
    useTripList,
    useTripDetail,
    useActiveTripByBus,
    useToggleCancelTrip,
  }
}

export default useTrip
