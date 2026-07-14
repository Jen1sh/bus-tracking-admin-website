"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import useStudent from "@/hooks/use-student"
import type { StudentListParams } from "@/types/api/student"

export default function StudentPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const { useStudentList } = useStudent()

  const params: Omit<StudentListParams, "page"> = {
    limit: 20,
    search: searchQuery,
    sortBy: "name",
    sortOrder: "asc",
  }

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useStudentList(params)

  const students = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((p) => p.data.items)
  }, [data])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="t-h1">Students</h1>
          <p className="t-body text-base-content/50 mt-1">View and manage student records</p>
        </div>
        <button className="btn btn-primary btn-sm">Add Student</button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="input input-md input-ghost bg-base-100 shadow-card flex items-center gap-1.5 min-w-48">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-base-content/30">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input type="text" placeholder="Search by name..." className="grow" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
      </div>

      <div className="overflow-x-auto rounded-box bg-base-100 shadow-card">
        <table className="table">
          <thead>
            <tr>
              <th className="w-40">Name</th>
              <th className="w-20">Class</th>
              <th className="w-32">Stop</th>
              <th className="w-32">Guardian Phone</th>
              <th className="w-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <span className="loading loading-spinner loading-md text-primary" />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-base-content/40">{(error as Error)?.message ?? "Failed to load students"}</span>
                    <button className="btn btn-ghost btn-xs" onClick={() => window.location.reload()}>Retry</button>
                  </div>
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-sm text-base-content/40">
                  {searchQuery ? "No students match your search." : "No students found."}
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id}>
                  <td className="font-medium text-sm">{s.name}</td>
                  <td className="text-sm text-base-content/60">{s.klass ?? "—"}</td>
                  <td className="text-sm text-base-content/60">{s.stop ?? "—"}</td>
                  <td className="text-sm text-base-content/60">{s.guardianPhone ?? "—"}</td>
                  <td className="w-0">
                    <div className="tooltip" data-tip="View details">
                      <button type="button" className="btn btn-ghost btn-xs btn-square" onClick={() => router.push(`/student/${s.id}`)}>
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
