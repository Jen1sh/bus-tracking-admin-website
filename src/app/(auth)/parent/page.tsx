"use client"

import { useState, useMemo } from "react"

const parents = [
  { id: "1", name: "Robert Chen", email: "robert.chen@email.com", students: 2, phone: "+1 555-0201" },
  { id: "2", name: "Maria Garcia", email: "maria.g@email.com", students: 1, phone: "+1 555-0202" },
  { id: "3", name: "David Kim", email: "david.kim@email.com", students: 3, phone: "+1 555-0203" },
  { id: "4", name: "Lisa Thompson", email: "lisa.t@email.com", students: 1, phone: "+1 555-0204" },
  { id: "5", name: "James Wilson", email: "j.wilson@email.com", students: 2, phone: "+1 555-0205" },
  { id: "6", name: "Emily Davis", email: "emily.d@email.com", students: 1, phone: "+1 555-0206" },
]

export default function ParentPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredParents = useMemo(() => {
    return parents.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="t-h1">Parents</h1>
          <p className="t-body text-base-content/50 mt-1">Manage parent accounts and communication</p>
        </div>
        <button className="btn btn-primary">Add Parent</button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="input input-md input-ghost bg-base-100 shadow-float flex items-center gap-1.5 min-w-48">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-base-content/30">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input type="text" placeholder="Search by name or email..." className="grow" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
      </div>

      <div className="overflow-x-auto rounded-box bg-base-100 shadow-float">
        <table className="table">
          <thead>
            <tr>
              <th className="w-36">Name</th>
              <th className="w-40">Email</th>
              <th className="w-28">Phone</th>
              <th className="w-20">Students</th>
              <th className="w-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredParents.map((parent) => (
              <tr key={parent.id}>
                <td className="font-medium">{parent.name}</td>
                <td className="text-base-content/60">{parent.email}</td>
                <td className="text-base-content/60">{parent.phone}</td>
                <td>
                  <span className="badge badge-sm badge-ghost">{parent.students}</span>
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
        {filteredParents.length === 0 && (
          <div className="py-8 text-center text-sm text-base-content/40">No parents match your search.</div>
        )}
      </div>
    </div>
  )
}
