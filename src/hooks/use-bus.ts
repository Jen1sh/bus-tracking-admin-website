import { useQuery } from "@tanstack/react-query"
import { listBuses, getBusById } from "@/services/bus-service"
import type { BusListParams } from "@/types/api/bus"

const useBus = () => {
  const useBusList = (params: BusListParams) =>
    useQuery({
      queryKey: ["buses", params],
      queryFn: () => listBuses(params),
    })

  const useBusDetail = (id?: string) =>
    useQuery({
      queryKey: ["bus", id ?? "none"],
      queryFn: () => getBusById(id!),
      enabled: !!id,
    })

  return { useBusList, useBusDetail }
}

export default useBus
