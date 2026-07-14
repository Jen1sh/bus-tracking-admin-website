"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import useStudent from "@/hooks/use-student"

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { useStudentDetail } = useStudent()

  const { data: res, isLoading, error } = useStudentDetail(id)
  const student = res?.data ?? null

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
        <span className="text-sm text-base-content/40">{(error as Error)?.message ?? "Failed to load student"}</span>
        <div className="flex gap-2">
          <Link href="/student" className="btn btn-ghost btn-sm">Back to Students</Link>
          <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-sm text-base-content/40">Student not found</span>
        <Link href="/student" className="btn btn-ghost btn-sm">Back to Students</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link href="/student" className="inline-flex items-center gap-1 text-xs text-base-content/40 hover:text-base-content/70 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
        Back to Students
      </Link>

      <div className="rounded-box bg-base-100 p-4 shadow-card">
        <div>
          <h1 className="t-h1">{student.name}</h1>
          {student.klass && <p className="t-body text-base-content/50 mt-0.5">Class: {student.klass}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Student Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/40">Name</span>
              <span className="text-base-content">{student.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Class</span>
              <span className="text-base-content">{student.klass ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Stop</span>
              <span className="text-base-content">{student.stop ?? "—"}</span>
            </div>
          </div>
        </div>

        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Guardian Contact</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/40">Phone</span>
              <span className="text-base-content">{student.guardianPhone ?? "—"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
