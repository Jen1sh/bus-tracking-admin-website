import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import {
  listTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  bulkDeleteTrips,
} from "@/services/trip-service"
import type { TripListParams } from "@/types/api/trip"
import type { CreateTripRequest, UpdateTripRequest, BulkDeleteRequest } from "@/types/models/trip"
import { toast } from "sonner"

const useTrip = () => {
  const qc = useQueryClient()

  const useTripList = (params: Omit<TripListParams, "page">) =>
    useInfiniteQuery({
      queryKey: ["trips", params],
      queryFn: ({ pageParam }) => listTrips({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    })

  const useTripDetail = (id?: string) =>
    useQuery({
      queryKey: ["trip", id ?? "none"],
      queryFn: () => getTripById(id!),
      enabled: !!id,
    })

  const useCreateTrip = () =>
    useMutation({
      mutationFn: (data: CreateTripRequest) => createTrip(data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["trips"] })
        toast.success("Trip created")
      },
      onError: () => toast.error("Failed to create trip"),
    })

  const useUpdateTrip = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateTripRequest }) => updateTrip(id, data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["trips"] })
        toast.success("Trip updated")
      },
      onError: () => toast.error("Failed to update trip"),
    })

  const useDeleteTrip = () =>
    useMutation({
      mutationFn: (id: string) => deleteTrip(id),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["trips"] })
        toast.success("Trip deleted")
      },
      onError: () => toast.error("Failed to delete trip"),
    })

  const useBulkDeleteTrips = () =>
    useMutation({
      mutationFn: (data: BulkDeleteRequest) => bulkDeleteTrips(data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["trips"] })
        toast.success("Trips deleted")
      },
      onError: () => toast.error("Failed to delete trips"),
    })

  return {
    useTripList,
    useTripDetail,
    useCreateTrip,
    useUpdateTrip,
    useDeleteTrip,
    useBulkDeleteTrips,
  }
}

export default useTrip
