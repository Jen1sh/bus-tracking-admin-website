"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { StatusBadge } from "@/components/status-badge"
import useParent from "@/hooks/use-parent"

const statusMap: Record<string, string> = {
  ACTIVE: "active",
  SUSPENDED: "inactive",
  PENDING_VERIFICATION: "inactive",
}

export default function ParentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { useParentDetail } = useParent()

  const { data: res, isLoading, error } = useParentDetail(id)
  const parent = res?.data ?? null

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
        <span className="text-sm text-base-content/40">{(error as Error)?.message ?? "Failed to load parent"}</span>
        <div className="flex gap-2">
          <Link href="/parent" className="btn btn-ghost btn-sm">Back to Parents</Link>
          <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    )
  }

  if (!parent) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-sm text-base-content/40">Parent not found</span>
        <Link href="/parent" className="btn btn-ghost btn-sm">Back to Parents</Link>
      </div>
    )
  }

  const effectiveStatus = statusMap[parent.accountStatus] ?? "inactive"

  return (
    <div className="space-y-6">
      <Link href="/parent" className="inline-flex items-center gap-1 text-xs text-base-content/40 hover:text-base-content/70 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
        Back to Parents
      </Link>

      <div className="rounded-box bg-base-100 p-4 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="t-h1">{parent.name}</h1>
              <StatusBadge status={effectiveStatus} />
            </div>
            <p className="t-body text-base-content/50 mt-0.5">{parent.email}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-box bg-base-100 p-3 shadow-card">
          <h2 className="t-label font-semibold mb-2">Personal Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/40">Name</span>
              <span className="text-base-content">{parent.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Email</span>
              <span className="text-base-content">{parent.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Phone</span>
              <span className="text-base-content">{parent.phone ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Role</span>
              <span className="text-base-content">{parent.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Joined</span>
              <span className="text-base-content">{new Date(parent.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
