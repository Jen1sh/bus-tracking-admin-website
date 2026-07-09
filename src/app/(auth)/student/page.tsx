"use client"

import { useState, useMemo } from "react"
import { StatusBadge } from "@/components/status-badge"

const students = [
  { id: "1", name: "Alice Chen", grade: "5th", bus: "Bus #12", parent: "Robert Chen", status: "active" },
  { id: "2", name: "Ben Chen", grade: "3rd", bus: "Bus #12", parent: "Robert Chen", status: "active" },
  { id: "3", name: "Sofia Garcia", grade: "2nd", bus: "Bus #08", parent: "Maria Garcia", status: "active" },
  { id: "4", name: "Ethan Kim", grade: "6th", bus: "Bus #15", parent: "David Kim", status: "active" },
  { id: "5", name: "Luna Kim", grade: "4th", bus: "Bus #15", parent: "David Kim", status: "inactive" },
  { id: "6", name: "Noah Thompson", grade: "1st", bus: "Bus #03", parent: "Lisa Thompson", status: "active" },
]

export default function StudentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.parent.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = statusFilter === "all" || s.status === statusFilter
      return matchesSearch && matchesFilter
    })
  }, [searchQuery, statusFilter])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="t-h1">Students</h1>
          <p className="t-body text-base-content/50 mt-1">View and manage student records</p>
        </div>
        <button className="btn btn-primary">Add Student</button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="input input-md input-ghost bg-base-100 shadow-float flex items-center gap-1.5 min-w-48">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-base-content/30">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input type="text" placeholder="Search by name or parent..." className="grow" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
        <select className="select select-md select-ghost bg-base-100 shadow-float min-w-32" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-box bg-base-100 shadow-float">
        <table className="table">
          <thead>
            <tr>
              <th className="w-36">Name</th>
              <th className="w-20">Grade</th>
              <th className="w-24">Bus</th>
              <th className="w-36">Parent</th>
              <th className="w-24">Status</th>
              <th className="w-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="font-medium">{student.name}</td>
                <td className="text-base-content/60">{student.grade}</td>
                <td className="text-base-content/60">{student.bus}</td>
                <td className="text-base-content/60">{student.parent}</td>
                <td>
                  <StatusBadge status={student.status} />
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
        {filteredStudents.length === 0 && (
          <div className="py-8 text-center text-sm text-base-content/40">No students match your search.</div>
        )}
      </div>
    </div>
  )
}
