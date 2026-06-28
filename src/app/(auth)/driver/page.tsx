"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { StatusBadge } from "@/components/status-badge"

const students = [
  { name: "Alice Chen", grade: "5th", bus: "Bus #12", parent: "Robert Chen", status: "active" },
  { name: "Ben Chen", grade: "3rd", bus: "Bus #12", parent: "Robert Chen", status: "active" },
  { name: "Sofia Garcia", grade: "2nd", bus: "Bus #08", parent: "Maria Garcia", status: "active" },
  { name: "Ethan Kim", grade: "6th", bus: "Bus #15", parent: "David Kim", status: "active" },
  { name: "Luna Kim", grade: "4th", bus: "Bus #15", parent: "David Kim", status: "inactive" },
  { name: "Noah Thompson", grade: "1st", bus: "Bus #03", parent: "Lisa Thompson", status: "active" },
]

const driversData = [
  { id: "1", name: "John Doe", email: "john@example.com", phone: "+1 555-0101", status: "on-duty", bus: "Bus #12", schedule: "6:30 AM — 9:30 AM" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+1 555-0102", status: "on-duty", bus: "Bus #08", schedule: "6:45 AM — 9:45 AM" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", phone: "+1 555-0103", status: "off-duty", bus: "Bus #15", schedule: "—" },
  { id: "4", name: "Sarah Lee", email: "sarah@example.com", phone: "+1 555-0104", status: "on-duty", bus: "Bus #03", schedule: "7:00 AM — 10:00 AM" },
  { id: "5", name: "Tom Brown", email: "tom@example.com", phone: "+1 555-0105", status: "on-leave", bus: "—", schedule: "—" },
  { id: "6", name: "Emily Davis", email: "emily@example.com", phone: "+1 555-0106", status: "on-duty", bus: "Bus #07", schedule: "6:30 AM — 9:30 AM" },
  { id: "7", name: "Robert Wilson", email: "robert@example.com", phone: "+1 555-0107", status: "inactive", bus: "—", schedule: "—" },
  { id: "8", name: "Lisa Chen", email: "lisa@example.com", phone: "+1 555-0108", status: "on-duty", bus: "Bus #05", schedule: "7:15 AM — 10:15 AM" },
]

function studentCount(bus: string) {
  if (bus === "—") return null
  const count = students.filter((s) => s.bus === bus).length
  return count || 0
}

export default function DriverPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [driverStatuses, setDriverStatuses] = useState<Record<string, string>>({})

  const filteredDrivers = useMemo(() => {
    return driversData.filter((d) => {
      const status = driverStatuses[d.id] ?? d.status
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = statusFilter === "all" || status === statusFilter
      return matchesSearch && matchesFilter
    })
  }, [searchQuery, statusFilter, driverStatuses])

  const toggleStatus = (id: string) => {
    setDriverStatuses((prev) => {
      const cur = prev[id] ?? driversData.find((d) => d.id === id)!.status
      return { ...prev, [id]: cur === "inactive" ? driversData.find((d) => d.id === id)!.status : "inactive" }
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="t-h2">Drivers</h1>
          <p className="t-body text-base-content/50 mt-0.5">Manage driver profiles and assignments</p>
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
        <label className="input input-bordered input-xs flex items-center gap-1.5 min-w-48">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-base-content/30">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input type="text" placeholder="Search by name or email..." className="grow" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
        <select className="select select-bordered select-xs min-w-32" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="on-duty">On Duty</option>
          <option value="off-duty">Off Duty</option>
          <option value="on-leave">On Leave</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-card card-hover">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Bus</th>
              <th>Students</th>
              <th className="w-0" />
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((d) => {
              const effectiveStatus = driverStatuses[d.id] ?? d.status
              const count = studentCount(d.bus)

              return (
                <tr
                  key={d.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/driver/${d.id}`)}
                >
                  <td>
                    <div className="font-medium text-sm">{d.name}</div>
                    <div className="text-[11px] text-base-content/40">{d.email}</div>
                  </td>
                  <td>
                    <StatusBadge status={effectiveStatus} />
                  </td>
                  <td className="text-sm text-base-content/60">{d.bus}</td>
                  <td className="text-sm text-base-content/60">
                    {count !== null ? (
                      <span className="badge badge-sm badge-ghost">{count}</span>
                    ) : (
                      <span className="text-base-content/30">—</span>
                    )}
                  </td>
                  <td className="w-0" onClick={(e) => e.stopPropagation()}>
                    <div className="dropdown dropdown-end">
                      <button type="button" className="btn btn-ghost btn-xs btn-square" aria-label="Actions">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                        </svg>
                      </button>
                      <ul className="dropdown-content menu menu-xs rounded-box border border-base-300 bg-base-100 p-1 shadow-md min-w-36">
                        <li>
                          <button type="button" onClick={() => router.push(`/driver/${d.id}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                              <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            Details
                          </button>
                        </li>
                        <li>
                          <button type="button" onClick={() => alert(`${count ?? 0} students assigned to ${d.bus === "—" ? "no bus" : d.bus}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                              <path d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25a.75.75 0 001.5 0v-8.25l6.75-3.728v4.662a.75.75 0 001.5 0V6.443zM1.5 15.234V7.273l2.25 1.242v4.441a3.75 3.75 0 002.487 3.548l2.938.979a.75.75 0 00.46 0l2.938-.98a3.75 3.75 0 002.487-3.548v-4.44L9 7.273v8.25a.75.75 0 01-1.5 0v-5.33l-4.5-2.485v7.278a.75.75 0 01-1.5 0z" />
                            </svg>
                            Students
                          </button>
                        </li>
                        <li>
                          <button type="button" onClick={() => toggleStatus(d.id)}>
                            {effectiveStatus === "inactive" ? (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                                <path fillRule="evenodd" d="M5.965 4.904l9.131 9.131a6.5 6.5 0 00-9.131-9.131zm8.07 10.192L4.904 5.965a6.5 6.5 0 009.131 9.131zM4.343 4.343a8 8 0 1111.314 11.314A8 8 0 014.343 4.343z" clipRule="evenodd" />
                              </svg>
                            )}
                            {effectiveStatus === "inactive" ? "Mark Active" : "Mark Inactive"}
                          </button>
                        </li>
                        <li>
                          <button type="button" onClick={() => alert(d.schedule !== "—" ? `Schedule: ${d.schedule}` : "No schedule assigned")}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                              <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                            </svg>
                            Schedule
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filteredDrivers.length === 0 && (
          <div className="py-8 text-center text-sm text-base-content/40">No drivers match your search.</div>
        )}
      </div>
    </div>
  )
}
