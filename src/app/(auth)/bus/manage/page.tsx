"use client"

import { useState } from "react"
import Link from "next/link"
import useBusManagement from "@/hooks/use-bus-management"
import type { BusDriverAssignmentRequest } from "@/types/models/busManagement"

export default function BusManagementPage() {
  const {
    useAssignments,
    useUnassignedBuses,
    useUnassignedDrivers,
    useCreateAssignment,
    useRemoveAssignment,
  } = useBusManagement()

  const { data: assignmentsRes, isLoading, error } = useAssignments()
  const assignments = assignmentsRes?.data ?? []

  const unassignedBuses = useUnassignedBuses()
  const unassignedDrivers = useUnassignedDrivers()

  const createAssignment = useCreateAssignment()
  const removeAssignment = useRemoveAssignment()

  const [showModal, setShowModal] = useState(false)
  const [selectedBusId, setSelectedBusId] = useState("")
  const [selectedUserId, setSelectedUserId] = useState("")
  const [license, setLicense] = useState("")

  const openModal = () => {
    setSelectedBusId("")
    setSelectedUserId("")
    setLicense("")
    setShowModal(true)
    unassignedBuses.refetch()
    unassignedDrivers.refetch()
  }

  const handleSubmit = () => {
    if (!selectedBusId || !selectedUserId || !license) return
    createAssignment.mutate(
      {
        busId: Number(selectedBusId),
        userId: Number(selectedUserId),
        license,
      } as BusDriverAssignmentRequest,
      {
        onSuccess: () => setShowModal(false),
      },
    )
  }

  const handleRemove = (id: number) => {
    if (!confirm("Remove this assignment?")) return
    removeAssignment.mutate(String(id))
  }

  const selectedBus = (unassignedBuses.data?.data ?? []).find((b) => String(b.id) === selectedBusId)
  const selectedDriver = (unassignedDrivers.data?.data ?? []).find((d) => String(d.id) === selectedUserId)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/bus" className="inline-flex items-center gap-1 text-xs text-base-content/40 hover:text-base-content/70 transition-colors mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Back to Buses
          </Link>
          <h1 className="t-h1">Bus Management</h1>
          <p className="t-body text-base-content/50 mt-1">Manage bus-driver assignments</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={openModal}>
          New Assignment
        </button>
      </div>

      <div className="overflow-x-auto rounded-box bg-base-100 shadow-card">
        <table className="table">
          <thead>
            <tr>
              <th className="w-24">Bus Plate</th>
              <th className="w-36">Driver</th>
              <th className="w-28">License</th>
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
                    <span className="text-sm text-base-content/40">{(error as Error)?.message ?? "Failed to load assignments"}</span>
                    <button className="btn btn-ghost btn-xs" onClick={() => window.location.reload()}>Retry</button>
                  </div>
                </td>
              </tr>
            ) : assignments.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-sm text-base-content/40">
                  No assignments yet. Create one to assign a driver to a bus.
                </td>
              </tr>
            ) : (
              assignments.map((a) => (
                <tr key={a.id}>
                  <td className="font-medium text-sm">{a.busPlate}</td>
                  <td className="text-sm text-base-content/80">{a.userName}</td>
                  <td className="text-sm text-base-content/60 font-mono">{a.license}</td>
                  <td className="w-0">
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs text-error hover:text-error"
                      onClick={() => handleRemove(a.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c-.84 0-1.673.025-2.5.075V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25v.325C11.673 4.025 10.84 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <dialog className="modal modal-open" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}>
          <div className="modal-box max-w-md">
            <h3 className="t-label font-semibold mb-4">New Assignment</h3>

            <div className="space-y-3">
              <div className="form-control">
                <label className="t-micro text-base-content/40 mb-1">Bus</label>
                <select className="select select-md w-full bg-base-100 shadow-card" value={selectedBusId} onChange={(e) => setSelectedBusId(e.target.value)} disabled={unassignedBuses.isFetching}>
                  {unassignedBuses.isFetching ? (
                    <option value="" disabled>Loading buses...</option>
                  ) : (
                    <>
                      <option value="">Select a bus...</option>
                      {(unassignedBuses.data?.data ?? []).map((b) => (
                        <option key={b.id} value={b.id}>{b.displayId} — {b.plate}</option>
                      ))}
                    </>
                  )}
                </select>
                {unassignedBuses.isFetching && (
                  <span className="absolute right-3 top-9"><span className="loading loading-spinner loading-xs" /></span>
                )}
              </div>

              <div className="form-control">
                <label className="t-micro text-base-content/40 mb-1">Driver</label>
                <select className="select select-md w-full bg-base-100 shadow-card" value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} disabled={unassignedDrivers.isFetching}>
                  {unassignedDrivers.isFetching ? (
                    <option value="" disabled>Loading drivers...</option>
                  ) : (
                    <>
                      <option value="">Select a driver...</option>
                      {(unassignedDrivers.data?.data ?? []).map((d) => (
                        <option key={d.id} value={d.id}>{d.name} ({d.email})</option>
                      ))}
                    </>
                  )}
                </select>
                {unassignedDrivers.isFetching && (
                  <span className="absolute right-3 top-9"><span className="loading loading-spinner loading-xs" /></span>
                )}
              </div>

              <div className="form-control">
                <label className="t-micro text-base-content/40 mb-1">License Number</label>
                <input type="text" className="input input-md w-full bg-base-100 shadow-card" placeholder="e.g. DL-1234" value={license} onChange={(e) => setLicense(e.target.value)} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6">
              <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="btn btn-primary btn-sm"
                disabled={!selectedBusId || !selectedUserId || !license || createAssignment.isPending}
                onClick={handleSubmit}
              >
                {createAssignment.isPending ? <span className="loading loading-spinner loading-xs" /> : "Assign"}
              </button>
            </div>

            {(selectedBus || selectedDriver) && (
              <div className="mt-3 pt-3 border-t border-base-200 text-[11px] text-base-content/40 space-y-0.5">
                {selectedBus && <p>Bus: {selectedBus.displayId} · {selectedBus.plate} · {selectedBus.capacity} seats</p>}
                {selectedDriver && <p>Driver: {selectedDriver.name} · {selectedDriver.email}</p>}
              </div>
            )}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  )
}
