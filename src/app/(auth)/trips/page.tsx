"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { StatusBadge } from "@/components/status-badge"
import useTrip from "@/hooks/use-trip"
import useDriver from "@/hooks/use-driver"
import useBus from "@/hooks/use-bus"
import type { TripListParams } from "@/types/api/trip"

const statusMap: Record<string, string> = {
  PENDING: "scheduled",
  ACTIVE: "in-progress",
  COMPLETED: "completed",
}

export default function TripsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const { useTripList } = useTrip()
  const { useDrivers } = useDriver()
  const { useBusList } = useBus()

  const apiStatus = statusFilter === "all" ? undefined : statusFilter === "completed" ? "COMPLETED" : statusFilter === "in-progress" ? "ACTIVE" : "PENDING"

  const params: Omit<TripListParams, "page"> = {
    limit: 20,
    search: searchQuery,
    status: apiStatus as "PENDING" | "ACTIVE" | "COMPLETED" | undefined,
    sortBy: "date",
    sortOrder: "desc",
  }

  const {
    data: tripsData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTripList(params)

  const { data: driversData } = useDrivers({
    limit: 200,
    search: "",
    status: "ACTIVE",
    sortBy: "name",
    sortOrder: "asc",
  })

  const { data: busesData } = useBusList({ search: "", status: "ongoing" })

  const trips = useMemo(() => {
    if (!tripsData) return []
    return tripsData.pages.flatMap((p) => p.data.items)
  }, [tripsData])

  const driverMap = useMemo(() => {
    if (!driversData) return new Map<number, string>()
    const map = new Map<number, string>()
    for (const p of driversData.pages) {
      for (const d of p.data.items) {
        map.set(d.id, d.name)
      }
    }
    return map
  }, [driversData])

  const busMap = useMemo(() => {
    if (!busesData?.data) return new Map<number, string>()
    const map = new Map<number, string>()
    for (const b of busesData.data) {
      map.set(b.id, b.displayId)
    }
    return map
  }, [busesData])

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    } catch {
      return iso
    }
  }

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    } catch {
      return iso
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="t-h1">Trips</h1>
          <p className="t-body text-base-content/50 mt-1">Manage bus trips and schedules</p>
        </div>
        <Link href="/trips/schedule" className="btn btn-primary btn-sm">
          Schedule Trip
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="input input-md input-ghost bg-base-100 shadow-card flex items-center gap-1.5 min-w-48">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-base-content/30">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input type="text" placeholder="Search by date..." className="grow" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
        <select className="select select-md select-ghost bg-base-100 shadow-card min-w-32" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-box bg-base-100 shadow-card">
        <table className="table">
          <thead>
            <tr>
              <th className="w-28">Date</th>
              <th className="w-24">Start</th>
              <th className="w-24">End</th>
              <th className="w-28">Driver</th>
              <th className="w-24">Bus</th>
              <th className="w-24">Status</th>
              <th className="w-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center py-12">
                  <span className="loading loading-spinner loading-md text-primary" />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-base-content/40">{(error as Error)?.message ?? "Failed to load trips"}</span>
                    <button className="btn btn-ghost btn-xs" onClick={() => window.location.reload()}>Retry</button>
                  </div>
                </td>
              </tr>
            ) : trips.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-sm text-base-content/40">
                  {searchQuery || statusFilter !== "all" ? "No trips match your search." : "No trips found."}
                </td>
              </tr>
            ) : (
              trips.map((t) => {
                const badgeStatus = statusMap[t.status] ?? "scheduled"
                return (
                  <tr key={t.tripId}>
                    <td className="text-sm text-base-content/60">{formatDate(t.date)}</td>
                    <td className="text-sm text-base-content/60">{formatTime(t.startTime)}</td>
                    <td className="text-sm text-base-content/60">{t.endTime ? formatTime(t.endTime) : "—"}</td>
                    <td className="text-sm text-base-content/60">{driverMap.get(t.driverId) ?? `Driver #${t.driverId}`}</td>
                    <td className="text-sm text-base-content/60">{busMap.get(t.busId) ?? `Bus #${t.busId}`}</td>
                    <td>
                      <StatusBadge status={badgeStatus} />
                    </td>
                    <td className="w-0">
                      <div className="tooltip" data-tip="View details">
                        <button type="button" className="btn btn-ghost btn-xs btn-square" onClick={() => router.push(`/trips/${t.tripId}`)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div className="flex justify-center pt-2">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  )
}
