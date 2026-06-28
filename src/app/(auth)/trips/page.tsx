import { StatusBadge } from "@/components/status-badge"

const trips = [
  { start: "Maple St Station", end: "Westside High", date: "May 31, 2026", startTime: "7:00 AM", endTime: "7:45 AM", driver: "John Doe", status: "completed" },
  { start: "Oak Ave Hub", end: "Eastside Elementary", date: "May 31, 2026", startTime: "7:15 AM", endTime: "8:05 AM", driver: "Jane Smith", status: "in-progress" },
  { start: "Pine St Terminal", end: "Northview Middle", date: "Jun 1, 2026", startTime: "7:30 AM", endTime: "8:15 AM", driver: "Mike Johnson", status: "scheduled" },
  { start: "Elm St Stop", end: "Southfield Academy", date: "Jun 1, 2026", startTime: "8:00 AM", endTime: "8:50 AM", driver: "Sarah Lee", status: "delayed" },
  { start: "Central Depot", end: "Lakeside High", date: "Jun 2, 2026", startTime: "8:15 AM", endTime: "9:00 AM", driver: "Tom Brown", status: "scheduled" },
  { start: "River Rd Station", end: "Hillcrest Elementary", date: "Jun 2, 2026", startTime: "9:00 AM", endTime: "9:40 AM", driver: "Emily Davis", status: "cancelled" },
]

export default function TripsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="t-h1">Trips</h1>
          <p className="t-body text-base-content/50 mt-1">Manage bus trips and schedules</p>
        </div>
        <a href="/trips/schedule" className="btn btn-primary">
          Schedule Trip
        </a>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow-card">
        <table className="table hover:table-zebra">
          <thead>
            <tr>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, i) => (
              <tr key={i}>
                <td className="font-medium">{trip.start}</td>
                <td className="text-base-content/60">{trip.end}</td>
                <td className="text-base-content/60">{trip.date}</td>
                <td className="text-base-content/60">{trip.startTime}</td>
                <td className="text-base-content/60">{trip.endTime}</td>
                <td className="text-base-content/60">{trip.driver}</td>
                <td>
                  <StatusBadge status={trip.status} />
                </td>
                <td>
                  <button className="btn btn-ghost btn-xs">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
