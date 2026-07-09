import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getBusManagement,
  addBusManagement,
  updateBusAssignment,
  getUnassignedBuses,
  getUnassignedDrivers,
} from "@/services/bus-management-service"
import type { BusDriverAssignmentRequest } from "@/types/models/busManagement"
import { toast } from "sonner"

const useBusManagement = () => {
  const qc = useQueryClient()

  const useAssignments = () =>
    useQuery({
      queryKey: ["bus-assignments"],
      queryFn: () => getBusManagement(),
    })

  const useUnassignedBuses = () =>
    useQuery({
      queryKey: ["unassigned-buses"],
      queryFn: () => getUnassignedBuses(),
      enabled: false,
    })

  const useUnassignedDrivers = () =>
    useQuery({
      queryKey: ["unassigned-drivers"],
      queryFn: () => getUnassignedDrivers(),
      enabled: false,
    })

  const useCreateAssignment = () =>
    useMutation({
      mutationFn: (data: BusDriverAssignmentRequest) => addBusManagement(data),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["bus-assignments"] })
        qc.invalidateQueries({ queryKey: ["unassigned-buses"] })
        qc.invalidateQueries({ queryKey: ["unassigned-drivers"] })
        toast.success("Assignment created successfully")
      },
      onError: () => toast.error("Failed to create assignment"),
    })

  const useRemoveAssignment = () =>
    useMutation({
      mutationFn: (id: string) => updateBusAssignment(id),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["bus-assignments"] })
        toast.success("Assignment removed successfully")
      },
      onError: () => toast.error("Failed to remove assignment"),
    })

  return {
    useAssignments,
    useUnassignedBuses,
    useUnassignedDrivers,
    useCreateAssignment,
    useRemoveAssignment,
  }
}

export default useBusManagement
