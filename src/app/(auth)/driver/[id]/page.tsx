import { notFound } from "next/navigation"
import Link from "next/link"
import { StatusBadge } from "@/components/status-badge"

const drivers = [
  { id: "1", name: "John Doe", email: "john@example.com", phone: "+1 555-0101", status: "on-duty", bus: "Bus #12", schedule: "6:30 AM — 9:30 AM", address: "123 Main St, Boston, MA", license: "DL-8294", joinDate: "Jan 2024" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+1 555-0102", status: "on-duty", bus: "Bus #08", schedule: "6:45 AM — 9:45 AM", address: "456 Oak Ave, Boston, MA", license: "DL-7351", joinDate: "Mar 2023" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", phone: "+1 555-0103", status: "off-duty", bus: "Bus #15", schedule: "—", address: "789 Pine St, Boston, MA", license: "DL-6128", joinDate: "Aug 2024" },
  { id: "4", name: "Sarah Lee", email: "sarah@example.com", phone: "+1 555-0104", status: "on-duty", bus: "Bus #03", schedule: "7:00 AM — 10:00 AM", address: "321 Elm St, Boston, MA", license: "DL-4473", joinDate: "Nov 2022" },
  { id: "5", name: "Tom Brown", email: "tom@example.com", phone: "+1 555-0105", status: "on-leave", bus: "—", schedule: "—", address: "654 River Rd, Boston, MA", license: "DL-5590", joinDate: "Jun 2023" },
  { id: "6", name: "Emily Davis", email: "emily@example.com", phone: "+1 555-0106", status: "on-duty", bus: "Bus #07", schedule: "6:30 AM — 9:30 AM", address: "987 Cedar Ln, Boston, MA", license: "DL-2217", joinDate: "Feb 2025" },
  { id: "7", name: "Robert Wilson", email: "robert@example.com", phone: "+1 555-0107", status: "inactive", bus: "—", schedule: "—", address: "147 Birch St, Boston, MA", license: "DL-8836", joinDate: "Oct 2023" },
  { id: "8", name: "Lisa Chen", email: "lisa@example.com", phone: "+1 555-0108", status: "on-duty", bus: "Bus #05", schedule: "7:15 AM — 10:15 AM", address: "258 Maple Ave, Boston, MA", license: "DL-3349", joinDate: "Apr 2024" },
]

const students = [
  { name: "Alice Chen", grade: "5th", bus: "Bus #12", parent: "Robert Chen", status: "active" },
  { name: "Ben Chen", grade: "3rd", bus: "Bus #12", parent: "Robert Chen", status: "active" },
  { name: "Sofia Garcia", grade: "2nd", bus: "Bus #08", parent: "Maria Garcia", status: "active" },
  { name: "Ethan Kim", grade: "6th", bus: "Bus #15", parent: "David Kim", status: "active" },
  { name: "Luna Kim", grade: "4th", bus: "Bus #15", parent: "David Kim", status: "inactive" },
  { name: "Noah Thompson", grade: "1st", bus: "Bus #03", parent: "Lisa Thompson", status: "active" },
]

const routeMap: Record<string, string> = {
  "Bus #12": "Route 5 — Maple St Station → Central Depot",
  "Bus #08": "Route 3 — Oak Ave Hub → Pine St Terminal",
  "Bus #15": "Route 2 — Central Depot → River Rd Station",
  "Bus #03": "Route 1 — Pine St Terminal → Elm St Stop",
  "Bus #07": "Route 4 — Elm St Stop → Oak Ave Hub",
  "Bus #05": "Route 6 — River Rd Station → Maple St Station",
}

const weekDays = [
  { label: "Mon 6/22", date: "Jun 22, 2026" },
  { label: "Tue 6/23", date: "Jun 23, 2026" },
  { label: "Wed 6/24", date: "Jun 24, 2026" },
  { label: "Thu 6/25", date: "Jun 25, 2026" },
  { label: "Fri 6/26", date: "Jun 26, 2026" },
]

export function generateStaticParams() {
  return drivers.map((d) => ({ id: d.id }))
}

export default async function DriverDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const driver = drivers.find((d) => d.id === id)
  if (!driver) notFound()

  const assignedStudents = students.filter((s) => s.bus === driver.bus)
  const route = routeMap[driver.bus]
  const hasSchedule = driver.schedule !== "—"

  return (
    <div className="space-y-4">
      <Link href="/driver" className="inline-flex items-center gap-1 text-xs text-base-content/40 hover:text-base-content/70 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
        Back to Drivers
      </Link>

      <div className="rounded-box border border-base-300 bg-base-100 p-4 shadow-card card-hover">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="t-h2">{driver.name}</h1>
              <StatusBadge status={driver.status} />
            </div>
            {route ? (
              <p className="t-body text-base-content/50 mt-0.5">{driver.bus} &middot; {route}</p>
            ) : (
              <p className="t-body text-base-content/50 mt-0.5">{driver.bus !== "—" ? driver.bus : "No bus assigned"}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-card card-hover">
          <h2 className="t-label font-semibold mb-2">Personal Info</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/40">Email</span>
              <span className="text-base-content">{driver.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Phone</span>
              <span className="text-base-content">{driver.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Address</span>
              <span className="text-base-content text-right max-w-56">{driver.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">License</span>
              <span className="text-base-content">{driver.license}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base-content/40">Joined</span>
              <span className="text-base-content">{driver.joinDate}</span>
            </div>
          </div>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-card card-hover">
          <h2 className="t-label font-semibold mb-2">Bus Assignment</h2>
          {driver.bus !== "—" ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-base-content/40">Vehicle</span>
                <span className="text-base-content font-medium">{driver.bus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/40">Route</span>
                <span className="text-base-content text-right max-w-56">{route}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/40">Capacity</span>
                <span className="text-base-content">48</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/40">Status</span>
                <StatusBadge status={driver.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/40">Shift</span>
                <span className="text-base-content">{driver.schedule}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-base-content/40 py-4 text-center">No bus currently assigned.</p>
          )}
        </div>
      </div>

      <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-card card-hover">
        <h2 className="t-label font-semibold mb-2">
          Assigned Students
          {assignedStudents.length > 0 && <span className="badge badge-sm badge-ghost ml-1.5">{assignedStudents.length}</span>}
        </h2>
        {assignedStudents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Parent</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {assignedStudents.map((s, i) => (
                  <tr key={i}>
                    <td className="font-medium text-sm">{s.name}</td>
                    <td className="text-sm text-base-content/60">{s.grade}</td>
                    <td className="text-sm text-base-content/60">{s.parent}</td>
                    <td>
                      <StatusBadge status={s.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-base-content/40 py-4 text-center">No students assigned.</p>
        )}
      </div>

      <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-card card-hover">
        <h2 className="t-label font-semibold mb-2">Upcoming Schedule</h2>
        {hasSchedule ? (
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Route</th>
                </tr>
              </thead>
              <tbody>
                {weekDays.map((day, i) => {
                  const [start, end] = driver.schedule.split(" — ")
                  return (
                    <tr key={i}>
                      <td className="text-sm font-medium">{day.label}</td>
                      <td className="text-sm text-base-content/60">{start}</td>
                      <td className="text-sm text-base-content/60">{end}</td>
                      <td className="text-sm text-base-content/60">{route ?? "—"}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-base-content/40 py-4 text-center">No upcoming schedule.</p>
        )}
      </div>
    </div>
  )
}
