export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-base-content/60">Overview of your bus tracking system</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat rounded-box bg-base-200">
          <div className="stat-title">Total Buses</div>
          <div className="stat-value text-primary">24</div>
          <div className="stat-desc">12 active now</div>
        </div>
        <div className="stat rounded-box bg-base-200">
          <div className="stat-title">Drivers</div>
          <div className="stat-value text-secondary">32</div>
          <div className="stat-desc">28 on duty</div>
        </div>
        <div className="stat rounded-box bg-base-200">
          <div className="stat-title">Students</div>
          <div className="stat-value text-accent">1,280</div>
          <div className="stat-desc">95% attendance</div>
        </div>
        <div className="stat rounded-box bg-base-200">
          <div className="stat-title">Routes</div>
          <div className="stat-value">18</div>
          <div className="stat-desc">All operational</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-box border border-base-300 bg-base-100 p-6">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <ul className="mt-4 space-y-3">
            {[
              { time: "2 min ago", event: "Bus #12 arrived at Maple St stop" },
              { time: "15 min ago", event: "Driver John D. completed Route 5" },
              { time: "1 hr ago", event: "New student Sarah K. assigned to Bus #8" },
              { time: "2 hrs ago", event: "Route 3 schedule updated" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-base-content/80">{item.event}</p>
                  <p className="text-xs text-base-content/40">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-6">
          <h2 className="text-lg font-semibold">Alerts</h2>
          <ul className="mt-4 space-y-3">
            {[
              { type: "warning", message: "Bus #07 maintenance due in 3 days" },
              { type: "info", message: "Driver license renewal for 5 drivers pending" },
              { type: "success", message: "All GPS trackers online" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    item.type === "warning"
                      ? "bg-warning"
                      : item.type === "info"
                        ? "bg-info"
                        : "bg-success"
                  }`}
                />
                <p className="text-base-content/80">{item.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
