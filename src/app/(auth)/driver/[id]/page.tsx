"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { StatusBadge } from "@/components/status-badge"
import { getBusById } from "@/services/bus-service"
import useDriver from "@/hooks/use-driver"

const statusMap: Record<string, string> = {
  ACTIVE: "active",
  SUSPENDED: "inactive",
  PENDING_VERIFICATION: "inactive",
}

export default function DriverDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { useDriverDetail, useBusAssignments } = useDriver()

  const { data: driverRes, isLoading: driverLoading, error: driverError } = useDriverDetail(id)
  const { data: mgmtRes } = useBusAssignments()

  const driver = driverRes?.data ?? null
  const assignments = mgmtRes?.data ?? []
  const assignment = assignments.find((a) => a.userId === driver?.id)
  const busId = assignment?.busId ? String(assignment.busId) : undefined

  const { data: busRes } = useQuery({
    queryKey: ["bus", busId],
    queryFn: () => getBusById(busId!),
    enabled: !!busId,
  })

  const bus = busRes?.data ?? null

  if (driverLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="loading loading-spinner loading-md text-primary" />
      </div>
    )
  }

  if (driverError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-sm text-base-content/40">{(driverError as Error)?.message ?? "Failed to load driver"}</span>
        <div className="flex gap-2">
          <Link href="/driver" className="btn btn-ghost btn-sm">Back to Drivers</Link>
          <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    )
  }

  if (!driver) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-sm text-base-content/40">Driver not found</span>
        <Link href="/driver" className="btn btn-ghost btn-sm">Back to Drivers</Link>
      </div>
    )
  }

  const effectiveStatus = statusMap[driver.accountStatus] ?? "inactive"

  return (
    <div className="space-y-6">
      <Link href="/driver" className="inline-flex items-center gap-1 text-xs text-base-content/40 hover:text-base-content/70 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
        Back to Drivers
      </Link>

      <div className="rounded-box bg-base-100 p-4 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="t-h1">{driver.name}</h1>
              <StatusBadge status={effectiveStatus} />
            </div>
            <p className="t-body text-base-content/50 mt-0.5">{driver.email}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Personal Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/40">Email</span>
              <span className="text-base-content">{driver.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Phone</span>
              <span className="text-base-content">{driver.phone ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Role</span>
              <span className="text-base-content">{driver.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Joined</span>
              <span className="text-base-content">{new Date(driver.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
            </div>
          </div>
        </div>

        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Bus Assignment</h2>
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
              <div className="flex justify-between">
                <span className="text-base-content/40">Shift</span>
                <span className="text-base-content">{bus.shift ?? "—"}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-base-content/40 py-4 text-center">No bus currently assigned.</p>
          )}
          <div className="mt-3 pt-3 border-t border-base-200">
            <Link href="/bus/manage" className="btn btn-ghost btn-xs w-full gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M4.5 2A2.5 2.5 0 002 4.5v2.882c0 .663.263 1.3.732 1.768L7.5 13.88V17.5a1 1 0 001 1h3a1 1 0 001-1v-3.62l4.768-4.73c.469-.468.732-1.105.732-1.768V4.5A2.5 2.5 0 0015.5 2h-11z" />
              </svg>
              Manage Assignments
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
