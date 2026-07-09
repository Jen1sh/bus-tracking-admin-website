"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import useBus from "@/hooks/use-bus"

const statusStyles: Record<string, { badge: string; dotColor: string }> = {
  ongoing: { badge: "badge-success", dotColor: "bg-success" },
  parked: { badge: "badge-ghost", dotColor: "bg-neutral/40" },
  inactive: { badge: "badge-ghost", dotColor: "bg-neutral/40" },
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase()
  const style = statusStyles[s] ?? { badge: "badge-ghost", dotColor: "bg-neutral/40" }
  return (
    <span className={`badge badge-sm gap-1.5 ${style.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dotColor}`} />
      {status}
    </span>
  )
}

export default function BusDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { useBusDetail } = useBus()

  const { data, isLoading, error } = useBusDetail(id)
  const bus = data?.data ?? null

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
        <span className="text-sm text-base-content/40">{(error as Error)?.message ?? "Failed to load bus"}</span>
        <div className="flex gap-2">
          <Link href="/bus" className="btn btn-ghost btn-sm">Back to Buses</Link>
          <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    )
  }

  if (!bus) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-sm text-base-content/40">Bus not found</span>
        <Link href="/bus" className="btn btn-ghost btn-sm">Back to Buses</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link href="/bus" className="inline-flex items-center gap-1 text-xs text-base-content/40 hover:text-base-content/70 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
        Back to Buses
      </Link>

      <div className="rounded-box bg-base-100 p-4 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="t-h1">{bus.displayId}</h1>
              <StatusBadge status={bus.status} />
            </div>
            <p className="t-body text-base-content/50 mt-0.5">{bus.plate}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Bus Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/40">Display ID</span>
              <span className="text-base-content">{bus.displayId}</span>
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
              <span className="text-base-content/40">Shift</span>
              <span className="text-base-content">{bus.shift ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Route</span>
              <span className="text-base-content text-right max-w-56">{bus.routeName ?? "—"}</span>
            </div>
          </div>
        </div>

        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Driver Assignment</h2>
          {bus.driverName ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-base-content/40">Driver</span>
                <span className="text-base-content font-medium">{bus.driverName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/40">Phone</span>
                <span className="text-base-content">{bus.driverPhone ?? "—"}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-base-content/40 py-4 text-center">No driver assigned.</p>
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

      <div className="rounded-box bg-base-100 p-3 shadow-card">
        <h2 className="t-label font-semibold mb-2">
          Students
          {bus.students.length > 0 && <span className="badge badge-sm badge-ghost ml-1.5">{bus.students.length}</span>}
        </h2>
        {bus.students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="w-36">Name</th>
                  <th className="w-20">Grade</th>
                  <th className="w-28">Stop</th>
                  <th className="w-32">Guardian</th>
                </tr>
              </thead>
              <tbody>
                {bus.students.map((s) => (
                  <tr key={s.id}>
                    <td className="font-medium text-sm">{s.name}</td>
                    <td className="text-sm text-base-content/60">{s.klass ?? "—"}</td>
                    <td className="text-sm text-base-content/60">{s.stop ?? "—"}</td>
                    <td className="text-sm text-base-content/60">{s.guardianPhone ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-base-content/40 py-4 text-center">No students assigned to this bus.</p>
        )}
      </div>
    </div>
  )
}
