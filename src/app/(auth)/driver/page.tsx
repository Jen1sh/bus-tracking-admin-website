export default function DriverPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Drivers</h1>
          <p className="mt-1 text-sm text-base-content/60">Manage driver profiles and assignments</p>
        </div>
        <button className="btn btn-primary btn-sm">Add Driver</button>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-300">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Assigned Bus</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "John Doe", email: "john@example.com", phone: "+1 555-0101", status: "On Duty", bus: "Bus #12" },
              { name: "Jane Smith", email: "jane@example.com", phone: "+1 555-0102", status: "On Duty", bus: "Bus #08" },
              { name: "Mike Johnson", email: "mike@example.com", phone: "+1 555-0103", status: "Off Duty", bus: "Bus #15" },
              { name: "Sarah Lee", email: "sarah@example.com", phone: "+1 555-0104", status: "On Duty", bus: "Bus #03" },
              { name: "Tom Brown", email: "tom@example.com", phone: "+1 555-0105", status: "On Leave", bus: "—" },
            ].map((driver, i) => (
              <tr key={i}>
                <td className="font-medium">{driver.name}</td>
                <td className="text-base-content/70">{driver.email}</td>
                <td className="text-base-content/70">{driver.phone}</td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      driver.status === "On Duty"
                        ? "badge-success"
                        : driver.status === "Off Duty"
                          ? "badge-ghost"
                          : "badge-warning"
                    }`}
                  >
                    {driver.status}
                  </span>
                </td>
                <td className="text-base-content/70">{driver.bus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
