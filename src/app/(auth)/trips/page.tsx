"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { StatusBadge } from "@/components/status-badge"

const trips = [
  { id: "1", start: "Maple St Station", end: "Westside High", date: "May 31, 2026", startTime: "7:00 AM", endTime: "7:45 AM", driver: "John Doe", status: "completed" },
  { id: "2", start: "Oak Ave Hub", end: "Eastside Elementary", date: "May 31, 2026", startTime: "7:15 AM", endTime: "8:05 AM", driver: "Jane Smith", status: "in-progress" },
  { id: "3", start: "Pine St Terminal", end: "Northview Middle", date: "Jun 1, 2026", startTime: "7:30 AM", endTime: "8:15 AM", driver: "Mike Johnson", status: "scheduled" },
  { id: "4", start: "Elm St Stop", end: "Southfield Academy", date: "Jun 1, 2026", startTime: "8:00 AM", endTime: "8:50 AM", driver: "Sarah Lee", status: "delayed" },
  { id: "5", start: "Central Depot", end: "Lakeside High", date: "Jun 2, 2026", startTime: "8:15 AM", endTime: "9:00 AM", driver: "Tom Brown", status: "scheduled" },
  { id: "6", start: "River Rd Station", end: "Hillcrest Elementary", date: "Jun 2, 2026", startTime: "9:00 AM", endTime: "9:40 AM", driver: "Emily Davis", status: "cancelled" },
]

export default function TripsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTrips = useMemo(() => {
    return trips.filter((t) => {
      const matchesSearch =
        t.start.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.end.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.driver.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = statusFilter === "all" || t.status === statusFilter
      return matchesSearch && matchesFilter
    })
  }, [searchQuery, statusFilter])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="t-h1">Trips</h1>
          <p className="t-body text-base-content/50 mt-1">Manage bus trips and schedules</p>
        </div>
        <Link href="/trips/schedule" className="btn btn-primary">
          Schedule Trip
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="input input-md input-ghost bg-base-100 shadow-float flex items-center gap-1.5 min-w-48">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-base-content/30">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input type="text" placeholder="Search by location or driver..." className="grow" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
        <select className="select select-md select-ghost bg-base-100 shadow-float min-w-32" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="scheduled">Scheduled</option>
          <option value="delayed">Delayed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-box bg-base-100 shadow-float">
        <table className="table">
          <thead>
            <tr>
              <th className="w-36">Start Location</th>
              <th className="w-36">End Location</th>
              <th className="w-28">Date</th>
              <th className="w-24">Start Time</th>
              <th className="w-24">End Time</th>
              <th className="w-28">Driver</th>
              <th className="w-24">Status</th>
              <th className="w-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map((trip) => (
              <tr key={trip.id}>
                <td className="font-medium">{trip.start}</td>
                <td className="text-base-content/60">{trip.end}</td>
                <td className="text-base-content/60">{trip.date}</td>
                <td className="text-base-content/60">{trip.startTime}</td>
                <td className="text-base-content/60">{trip.endTime}</td>
                <td className="text-base-content/60">{trip.driver}</td>
                <td>
                  <StatusBadge status={trip.status} />
                </td>
                <td className="w-0">
                  <div className="tooltip" data-tip="View details">
                    <button className="btn btn-ghost btn-xs btn-square" aria-label="View details">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTrips.length === 0 && (
          <div className="py-8 text-center text-sm text-base-content/40">No trips match your search.</div>
        )}
      </div>
    </div>
  )
}
