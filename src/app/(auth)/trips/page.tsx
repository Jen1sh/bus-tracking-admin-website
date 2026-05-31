export default function TripsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trips</h1>
          <p className="mt-1 text-sm text-base-content/60">Manage bus trips and schedules</p>
        </div>
        <a href="/trips/schedule" className="btn btn-primary btn-sm">Schedule Trip</a>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-300">
        <table className="table">
          <thead>
            <tr>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Start Date Time</th>
              <th>End Date Time</th>
              <th>Assigned Driver</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { start: "Maple St Station", end: "Westside High", startTime: "May 31, 2026 7:00 AM", endTime: "May 31, 2026 7:45 AM", driver: "John Doe", status: "Completed" },
              { start: "Oak Ave Hub", end: "Eastside Elementary", startTime: "May 31, 2026 7:15 AM", endTime: "May 31, 2026 8:05 AM", driver: "Jane Smith", status: "In Progress" },
              { start: "Pine St Terminal", end: "Northview Middle", startTime: "Jun 1, 2026 7:30 AM", endTime: "Jun 1, 2026 8:15 AM", driver: "Mike Johnson", status: "Scheduled" },
              { start: "Elm St Stop", end: "Southfield Academy", startTime: "Jun 1, 2026 8:00 AM", endTime: "Jun 1, 2026 8:50 AM", driver: "Sarah Lee", status: "Delayed" },
              { start: "Central Depot", end: "Lakeside High", startTime: "Jun 2, 2026 8:15 AM", endTime: "Jun 2, 2026 9:00 AM", driver: "Tom Brown", status: "Scheduled" },
              { start: "River Rd Station", end: "Hillcrest Elementary", startTime: "Jun 2, 2026 9:00 AM", endTime: "Jun 2, 2026 9:40 AM", driver: "Emily Davis", status: "Cancelled" },
            ].map((trip, i) => (
              <tr key={i}>
                <td className="font-medium">{trip.start}</td>
                <td className="text-base-content/70">{trip.end}</td>
                <td className="text-base-content/70">{trip.startTime}</td>
                <td className="text-base-content/70">{trip.endTime}</td>
                <td className="text-base-content/70">{trip.driver}</td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      trip.status === "Completed"
                        ? "badge-success"
                        : trip.status === "In Progress"
                          ? "badge-info"
                          : trip.status === "Scheduled"
                            ? "badge-ghost"
                            : trip.status === "Delayed"
                              ? "badge-warning"
                              : "badge-error"
                    }`}
                  >
                    {trip.status}
                  </span>
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
