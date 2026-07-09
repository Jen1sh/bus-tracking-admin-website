"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { StatusBadge } from "@/components/status-badge"
import useDriver from "@/hooks/use-driver"
import type { DriverListParams } from "@/types/api/driver"

const statusMap: Record<string, string> = {
  ACTIVE: "active",
  SUSPENDED: "inactive",
  PENDING_VERIFICATION: "inactive",
}

export default function DriverPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const { useDrivers, useBusAssignments, useAllBuses } = useDriver()

  const apiStatus = statusFilter === "all" ? "ACTIVE" : statusFilter === "active" ? "ACTIVE" : "SUSPENDED"

  const params: Omit<DriverListParams, "page"> = {
    limit: 20,
    search: searchQuery,
    status: apiStatus as "ACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION",
    sortBy: "name",
    sortOrder: "asc",
  }

  const {
    data: driversData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDrivers(params)

  const { data: mgmtRes } = useBusAssignments()
  const { data: busesRes } = useAllBuses()

  const drivers = useMemo(() => {
    if (!driversData) return []
    return driversData.pages.flatMap((p) => p.data.items)
  }, [driversData])

  const busAssignments = useMemo(() => {
    const busMap: Record<number, { busId: number; displayId: string }> = {}
    const mgmt = mgmtRes?.data ?? []
    const buses = busesRes?.data ?? []
    const busLookup = new Map(buses.map((b) => [b.id, b.displayId]))
    for (const a of mgmt) {
      const displayId = busLookup.get(a.busId) ?? `Bus #${a.busId}`
      busMap[a.userId] = { busId: a.busId, displayId }
    }
    return busMap
  }, [mgmtRes, busesRes])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="t-h1">Drivers</h1>
          <p className="t-body text-base-content/50 mt-1">Manage driver profiles and assignments</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="btn btn-ghost btn-xs gap-1" aria-label="Export">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            Export
          </button>
          <button className="btn btn-primary btn-sm">Add Driver</button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="input input-md input-ghost bg-base-100 shadow-card flex items-center gap-1.5 min-w-48">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-base-content/30">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input type="text" placeholder="Search by name or email..." className="grow" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
        <select className="select select-md select-ghost bg-base-100 shadow-card min-w-32" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-box bg-base-100 shadow-card">
        <table className="table">
          <thead>
            <tr>
              <th className="w-40">Name</th>
              <th className="w-24">Status</th>
              <th className="w-24">Bus</th>
              <th className="w-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-12">
                  <span className="loading loading-spinner loading-md text-primary" />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-base-content/40">{(error as Error)?.message ?? "Failed to load drivers"}</span>
                    <button className="btn btn-ghost btn-xs" onClick={() => window.location.reload()}>Retry</button>
                  </div>
                </td>
              </tr>
            ) : drivers.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-sm text-base-content/40">
                  {searchQuery || statusFilter !== "all" ? "No drivers match your search." : "No drivers found."}
                </td>
              </tr>
            ) : (
              drivers.map((d) => {
                const effectiveStatus = statusMap[d.accountStatus] ?? "inactive"
                const bus = busAssignments[d.id]

                return (
                  <tr key={d.id}>
                    <td>
                      <div className="font-medium text-sm">{d.name}</div>
                      <div className="text-[11px] text-base-content/40">{d.email}</div>
                    </td>
                    <td>
                      <StatusBadge status={effectiveStatus} />
                    </td>
                    <td className="text-sm text-base-content/60">
                      {bus ? (
                        <button className="link link-hover text-primary" onClick={() => router.push(`/bus/${bus.busId}`)}>
                          {bus.displayId}
                        </button>
                      ) : (
                        <span className="text-base-content/30">—</span>
                      )}
                    </td>
                    <td className="w-0">
                      <div className="flex items-center gap-0.5">
                        <div className="tooltip" data-tip="View details">
                          <button type="button" className="btn btn-ghost btn-xs btn-square" onClick={() => router.push(`/driver/${d.id}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                              <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
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
