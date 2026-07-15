"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StatusBadge } from "@/components/status-badge"
import useBus from "@/hooks/use-bus"

const statusLabel: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
}

export default function BusDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { useBusDetail, useBusCheckpoints } = useBus()

  const { data, isLoading, error } = useBusDetail(id)
  const { data: cpRes } = useBusCheckpoints(id)
  const bus = data?.data ?? null
  const checkpoints = cpRes?.data ?? []

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
        <ArrowLeft size={14} />
        Back to Buses
      </Link>

      <Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Buses", href: "/bus" }, { label: bus.displayId }]} />

      <div className="rounded-box bg-base-100 p-4 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="t-h1">{bus.displayId}</h1>
              <StatusBadge status={bus.status} label={statusLabel[bus.status.toLowerCase()] ?? bus.status} />
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
        </div>
      </div>

      {checkpoints.length > 0 && (
        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Checkpoints</h2>
          <div className="space-y-1 text-sm">
            {checkpoints.map((cp) => (
              <div key={cp.id} className="flex items-center gap-2">
                <span className="text-base-content/40">{cp.order + 1}.</span>
                <span className="text-base-content">{cp.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

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
                  <th className="w-28">Checkpoint</th>
                  <th className="w-32">Parent</th>
                  <th className="w-32">Phone</th>
                </tr>
              </thead>
              <tbody>
                {bus.students.map((s) => (
                  <tr key={s.id}>
                    <td className="font-medium text-sm">{s.name}</td>
                    <td className="text-sm text-base-content/60">{s.klass ?? "—"}</td>
                    <td className="text-sm text-base-content/60">{s.checkpoint ?? "—"}</td>
                    <td className="text-sm text-base-content/60">{s.parentName ?? "—"}</td>
                    <td className="text-sm text-base-content/60">{s.phone ?? "—"}</td>
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
