"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { StatusBadge } from "@/components/status-badge"
import { getBusById } from "@/services/bus-service"
import useTrip from "@/hooks/use-trip"
import useDriver from "@/hooks/use-driver"

const statusMap: Record<string, string> = {
  PENDING: "scheduled",
  ACTIVE: "in-progress",
  COMPLETED: "completed",
}

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { useTripDetail } = useTrip()
  const { useDrivers } = useDriver()

  const { data: tripRes, isLoading, error } = useTripDetail(id)
  const { data: driversRes } = useDrivers({
    limit: 200,
    search: "",
    status: "ACTIVE",
    sortBy: "name",
    sortOrder: "asc",
  })

  const trip = tripRes?.data ?? null

  const driverId = trip ? String(trip.driverId) : undefined
  const busId = trip ? String(trip.busId) : undefined

  const { data: busRes } = useQuery({
    queryKey: ["bus", busId],
    queryFn: () => getBusById(busId!),
    enabled: !!busId,
  })

  const drivers = driversRes?.pages.flatMap((p) => p.data.items) ?? []
  const driver = drivers.find((d) => d.id === trip?.driverId)
  const bus = busRes?.data ?? null

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="loading loading-spinner loading-md text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-sm text-base-content/40">{(error as Error)?.message ?? "Failed to load trip"}</span>
        <div className="flex gap-2">
          <Link href="/trips" className="btn btn-ghost btn-sm">Back to Trips</Link>
          <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-sm text-base-content/40">Trip not found</span>
        <Link href="/trips" className="btn btn-ghost btn-sm">Back to Trips</Link>
      </div>
    )
  }

  const badgeStatus = statusMap[trip.status] ?? "scheduled"

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    } catch {
      return iso
    }
  }

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    } catch {
      return iso
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/trips" className="inline-flex items-center gap-1 text-xs text-base-content/40 hover:text-base-content/70 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
        Back to Trips
      </Link>

      <div className="rounded-box bg-base-100 p-4 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="t-h1">Trip #{trip.tripId}</h1>
              <StatusBadge status={badgeStatus} />
            </div>
            <p className="t-body text-base-content/50 mt-0.5">{formatDate(trip.date)}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Trip Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/40">Status</span>
              <span className="text-base-content capitalize">{trip.status.toLowerCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Date</span>
              <span className="text-base-content">{formatDate(trip.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Start Time</span>
              <span className="text-base-content">{formatTime(trip.startTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">End Time</span>
              <span className="text-base-content">{trip.endTime ? formatTime(trip.endTime) : "—"}</span>
            </div>
          </div>
        </div>

        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Driver</h2>
          {driver ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-base-content/40">Name</span>
                <Link href={`/driver/${driver.id}`} className="text-primary font-medium link link-hover">{driver.name}</Link>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/40">Email</span>
                <span className="text-base-content">{driver.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/40">Phone</span>
                <span className="text-base-content">{driver.phone ?? "—"}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-base-content/40 py-4 text-center">Driver info unavailable</p>
          )}
          <div className="mt-3 pt-3 border-t border-base-200">
            <Link href={`/driver/${trip.driverId}`} className="btn btn-ghost btn-xs w-full gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              View Driver
            </Link>
          </div>
        </div>

        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Bus</h2>
          {bus ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-base-content/40">Vehicle</span>
                <Link href={`/bus/${bus.id}`} className="text-primary font-medium link link-hover">{bus.displayId}</Link>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/40">Plate</span>
                <span className="text-base-content font-mono">{bus.plate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/40">Capacity</span>
                <span className="text-base-content">{bus.capacity ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/40">Route</span>
                <span className="text-base-content text-right max-w-56">{bus.routeName ?? "—"}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-base-content/40 py-4 text-center">Bus info unavailable</p>
          )}
          <div className="mt-3 pt-3 border-t border-base-200">
            <Link href={`/bus/${trip.busId}`} className="btn btn-ghost btn-xs w-full gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M4.5 2A2.5 2.5 0 002 4.5v2.882c0 .663.263 1.3.732 1.768L7.5 13.88V17.5a1 1 0 001 1h3a1 1 0 001-1v-3.62l4.768-4.73c.469-.468.732-1.105.732-1.768V4.5A2.5 2.5 0 0015.5 2h-11z" />
              </svg>
              View Bus
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
