"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StatusBadge } from "@/components/status-badge"
import useTrip from "@/hooks/use-trip"

const statusMap: Record<string, string> = {
  PENDING: "scheduled",
  ACTIVE: "in-progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
}

const statusLabel: Record<string, string> = {
  PENDING: "Scheduled",
  ACTIVE: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
}

const attendanceLabel: Record<string, string> = {
  ONBOARD: "On Board",
  DROPPED: "Dropped",
  ABSENT: "Absent",
  NOT_TODAY: "Not Today",
}

const attendanceStyle: Record<string, string> = {
  ONBOARD: "badge-success",
  DROPPED: "badge-info",
  ABSENT: "badge-error",
  NOT_TODAY: "badge-ghost",
}

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { useTripDetail, useToggleCancelTrip } = useTrip()
  const cancelMutation = useToggleCancelTrip()

  const { data: tripRes, isLoading, error } = useTripDetail(id)
  const trip = tripRes?.data ?? null

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

  const formatTime = (iso: string | null) => {
    if (!iso) return "—"
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

  const handleToggleCancel = () => {
    if (!confirm("Are you sure you want to toggle the cancellation status of this trip?")) return
    cancelMutation.mutate(trip.id)
  }

  return (
    <div className="space-y-6">
      <Link href="/trips" className="inline-flex items-center gap-1 text-xs text-base-content/40 hover:text-base-content/70 transition-colors">
        <ArrowLeft size={14} />
        Back to Trips
      </Link>

      <Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Trips", href: "/trips" }, { label: `Trip #${trip.id}` }]} />

      <div className="rounded-box bg-base-100 p-4 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="t-h1">Trip #{trip.id}</h1>
              <StatusBadge status={badgeStatus} label={statusLabel[trip.status] ?? trip.status} />
            </div>
            <p className="t-body text-base-content/50 mt-0.5">{formatDate(trip.date)}</p>
          </div>
          {(trip.status === "PENDING" || trip.status === "ACTIVE" || trip.status === "CANCELLED") && (
            <button
              className={`btn btn-sm ${trip.status === "CANCELLED" ? "btn-success" : "btn-error"}`}
              onClick={handleToggleCancel}
              disabled={cancelMutation.isPending}
            >
              {cancelMutation.isPending ? (
                <span className="loading loading-spinner loading-xs" />
              ) : trip.status === "CANCELLED" ? (
                "Restore Trip"
              ) : (
                "Cancel Trip"
              )}
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Trip Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/40">Status</span>
              <span className="text-base-content">{statusLabel[trip.status] ?? trip.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Date</span>
              <span className="text-base-content">{formatDate(trip.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Shift</span>
              <span className="text-base-content">{trip.shift ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Start Time</span>
              <span className="text-base-content">{formatTime(trip.start)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">End Time</span>
              <span className="text-base-content">{formatTime(trip.end)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">On Time</span>
              <span className="text-base-content">{trip.onTime === null ? "—" : trip.onTime ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>

        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Route Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/40">Driver</span>
              <span className="text-base-content font-medium">{trip.driverName ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Route</span>
              <span className="text-base-content">{trip.routeName ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Bus</span>
              <Link href={`/bus/${trip.busDisplayId}`} className="text-primary font-medium link link-hover">{trip.busDisplayId}</Link>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Students</span>
              <span className="text-base-content">{trip.studentCount}</span>
            </div>
          </div>
        </div>
      </div>

      {trip.roster && trip.roster.length > 0 && (
        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">
            Attendance Roster
            <span className="badge badge-sm badge-ghost ml-1.5">{trip.roster.length}</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-36">Name</th>
                  <th className="w-20">Class</th>
                  <th className="w-28">Checkpoint</th>
                  <th className="w-24">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {trip.roster.map((r) => (
                  <tr key={r.studentId}>
                    <td className="font-medium text-sm">{r.name}</td>
                    <td className="text-sm text-base-content/60">{r.klass ?? "—"}</td>
                    <td className="text-sm text-base-content/60">{r.checkpoint ?? "—"}</td>
                    <td>
                      <span className={`badge badge-sm ${attendanceStyle[r.attendanceStatus] ?? "badge-ghost"}`}>
                        {attendanceLabel[r.attendanceStatus] ?? r.attendanceStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
