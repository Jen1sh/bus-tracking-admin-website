"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useBus from "@/hooks/use-bus"
import type { BusListParams } from "@/types/api/bus"

const statusStyles: Record<string, { badge: string; dotColor: string }> = {
  ongoing: { badge: "badge-success", dotColor: "bg-success" },
  parked: { badge: "badge-ghost", dotColor: "bg-neutral/40" },
  inactive: { badge: "badge-ghost", dotColor: "bg-neutral/40" },
}

function BusStatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase()
  const style = statusStyles[s] ?? { badge: "badge-ghost", dotColor: "bg-neutral/40" }
  return (
    <span className={`badge badge-sm gap-1.5 ${style.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dotColor}`} />
      {status}
    </span>
  )
}

export default function BusPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { useBusList } = useBus()

  const params: BusListParams = {
    search: searchQuery,
    status: statusFilter === "all" ? "ongoing" : statusFilter as "ongoing" | "parked" | "inactive",
  }

  const { data, isLoading, error } = useBusList(params)
  const buses = data?.data ?? []

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="t-h1">Buses</h1>
          <p className="t-body text-base-content/50 mt-1">Manage bus fleet and assignments</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="btn btn-primary btn-sm" onClick={() => router.push("/bus/manage")}>
            Manage Assignments
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="input input-md input-ghost bg-base-100 shadow-card flex items-center gap-1.5 min-w-48">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-base-content/30">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input type="text" placeholder="Search by bus ID, plate, or driver..." className="grow" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
        <select className="select select-md select-ghost bg-base-100 shadow-card min-w-32" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="parked">Parked</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-box bg-base-100 shadow-card">
        <table className="table">
          <thead>
            <tr>
              <th className="w-28">Bus ID</th>
              <th className="w-28">Plate</th>
              <th className="w-20">Capacity</th>
              <th className="w-20">Students</th>
              <th className="w-36">Driver</th>
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
                    <span className="text-sm text-base-content/40">{(error as Error)?.message ?? "Failed to load buses"}</span>
                    <button className="btn btn-ghost btn-xs" onClick={() => window.location.reload()}>Retry</button>
                  </div>
                </td>
              </tr>
            ) : buses.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-sm text-base-content/40">
                  {searchQuery || statusFilter !== "all" ? "No buses match your search." : "No buses found."}
                </td>
              </tr>
            ) : (
              buses.map((b) => (
                <tr key={b.id}>
                  <td className="font-medium text-sm">{b.displayId}</td>
                  <td className="text-sm text-base-content/80 font-mono">{b.plate}</td>
                  <td className="text-sm text-base-content/60">{b.capacity ?? "—"}</td>
                  <td className="text-sm text-base-content/60">{b.studentCount}</td>
                  <td className="text-sm text-base-content/60">{b.driverName ?? "—"}</td>
                  <td>
                    <BusStatusBadge status={b.status} />
                  </td>
                  <td className="w-0">
                    <div className="tooltip" data-tip="View details">
                      <button type="button" className="btn btn-ghost btn-xs btn-square" onClick={() => router.push(`/bus/${b.id}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                          <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
