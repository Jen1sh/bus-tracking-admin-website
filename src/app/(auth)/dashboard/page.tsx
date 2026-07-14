"use client"

import { useState, useMemo } from "react"
import { KpiCard } from "@/components/kpi-card"
import { NotificationCard } from "@/components/notification-card"
import { AlertBanner } from "@/components/alert-banner"
import { DashboardMap } from "@/components/dashboard-map"
import useDashboard from "@/hooks/use-dashboard"

interface ActivityItem {
  id: number
  title: string
  description: string
  time: string
  type: "success" | "info"
}

interface AlertItem {
  id: number
  tone: "warning" | "info" | "success"
  title: string
  description: string
}

const initialActivity: ActivityItem[] = [
  { id: 1, title: "Bus #12 arrived at Maple St stop", description: "Scheduled stop completed", time: "2 min ago", type: "success" },
  { id: 2, title: "Route 5 completed", description: "Driver John D. finished at 8:45 AM", time: "15 min ago", type: "success" },
  { id: 3, title: "New student assigned", description: "Sarah K. assigned to Bus #8", time: "1 hr ago", type: "info" },
  { id: 4, title: "Route 3 schedule updated", description: "Afternoon times adjusted", time: "2 hrs ago", type: "success" },
]

const initialAlerts: AlertItem[] = [
  { id: 1, tone: "warning", title: "Bus #07 maintenance due in 3 days", description: "Schedule service appointment" },
  { id: 2, tone: "info", title: "Driver license renewal pending", description: "5 drivers need to update their licenses" },
  { id: 3, tone: "success", title: "All GPS trackers online", description: "System fully operational" },
]

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-base-300/50 ${className ?? ""}`} />
}

function LoadingCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-box bg-base-100 p-3 shadow-float">
          <SkeletonBlock className="mb-2 h-3 w-16" />
          <SkeletonBlock className="mb-1 h-7 w-20" />
          <SkeletonBlock className="h-3 w-24" />
        </div>
      ))}
    </div>
  )
}

function LoadingRightColumn() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-box bg-base-100 p-3 shadow-float">
          <SkeletonBlock className="mb-3 h-4 w-28" />
          <div className="space-y-2">
            <SkeletonBlock className="h-10 w-full" />
            <SkeletonBlock className="h-10 w-full" />
            <SkeletonBlock className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null)
  const [activity] = useState<ActivityItem[]>(initialActivity)
  const [alerts] = useState<AlertItem[]>(initialAlerts)

  const { useDashboardStats, useActiveBuses, useBusLocation } = useDashboard()

  const { data: statsRes, isLoading: statsLoading } = useDashboardStats()
  const { data: activeRes, isLoading: activeLoading, isError: activeError } = useActiveBuses()

  const { data: locationRes } = useBusLocation(selectedBusId ?? undefined)

  const stats = statsRes?.data ?? null
  const activeBuses = useMemo(() => activeRes?.data ?? [], [activeRes])
  const location = locationRes?.data ?? null
  const loading = statsLoading || activeLoading

  const handleSelectBus = (busId: number) => {
    setSelectedBusId((prev) => (prev === String(busId) ? null : String(busId)))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="t-h1">Dashboard</h1>
          <p className="t-body text-base-content/50 mt-0.5">Overview of your bus tracking system</p>
        </div>
      </div>

      {loading ? (
        <>
          <LoadingCards />
          <div className="grid gap-4 lg:grid-cols-2 items-start">
            <div className="rounded-box bg-base-100 p-3 shadow-float">
              <SkeletonBlock className="mb-2 h-4 w-16" />
              <SkeletonBlock className="h-[400px] w-full" />
            </div>
            <LoadingRightColumn />
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Active Buses"
              value={stats?.activeBuses ?? 0}
              description={`${stats?.totalBuses ?? 0} total in fleet`}
              valueColor="text-primary"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
              }
            />
            <KpiCard
              title="Total Buses"
              value={stats?.totalBuses ?? 0}
              description="In your fleet"
              valueColor="text-secondary"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
              }
            />
            <KpiCard
              title="Students Riding"
              value={stats?.studentsRiding ?? 0}
              description="Currently assigned"
              valueColor="text-accent"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25a.75.75 0 001.5 0v-8.25l6.75-3.728v4.662a.75.75 0 001.5 0V6.443zM1.5 15.234V7.273l2.25 1.242v4.441a3.75 3.75 0 002.487 3.548l2.938.979a.75.75 0 00.46 0l2.938-.98a3.75 3.75 0 002.487-3.548v-4.44L9 7.273v8.25a.75.75 0 01-1.5 0v-5.33l-4.5-2.485v7.278a.75.75 0 01-1.5 0z" />
                </svg>
              }
            />
            <KpiCard
              title="On-Time"
              value={`${stats?.onTimePct ?? 0}%`}
              description="Arrival accuracy"
              valueColor="text-success"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.732a1 1 0 011.32.257l.687.91a1 1 0 01.203.845l-.49 1.97c.33.392.615.822.848 1.283l1.475.294a1 1 0 01.804.98v1.36a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.732 1.25a1 1 0 01-.257 1.32l-.91.687a1 1 0 01-.845.203l-1.97-.49a6.973 6.973 0 01-1.283.848l-.294 1.475a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.968 6.968 0 01-1.416-.587l-1.25.732a1 1 0 01-1.32-.257l-.687-.91a1 1 0 01-.203-.845l.49-1.97A6.97 6.97 0 013.16 12.22l-1.475-.294a1 1 0 01-.804-.98V9.586a1 1 0 01.804-.98l1.473-.295q.268-.746.587-1.416l-.732-1.25a1 1 0 01.257-1.32l.91-.687a1 1 0 01.845-.203l1.97.49a6.9 6.9 0 011.283-.848l.294-1.474zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              }
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2 items-start">
            <DashboardMap buses={activeBuses} selectedBusId={selectedBusId} onSelectBus={handleSelectBus} location={location} />

            <div className="flex flex-col gap-4">
              <div className="rounded-box bg-base-100 shadow-float">
                <div className="border-b border-base-200 px-3 py-2.5">
                  <h2 className="t-label font-semibold">Recent Activity</h2>
                </div>
                <div className="divide-y divide-base-200">
                  {activity.map((item) => (
                    <NotificationCard
                      key={item.id}
                      flat
                      compact
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      }
                      iconBg={item.type === "info" ? "bg-info" : "bg-success"}
                      title={item.title}
                      description={item.description}
                      timestamp={item.time}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-box bg-base-100 shadow-float">
                <div className="border-b border-base-200 px-3 py-2.5">
                  <h2 className="t-label font-semibold">Active Buses</h2>
                </div>
                {activeError ? (
                  <div className="px-3 py-6 text-center text-sm text-base-content/40">Failed to load active buses</div>
                ) : activeBuses.length === 0 ? (
                  <div className="px-3 py-6 text-center text-sm text-base-content/40">No active buses right now</div>
                ) : (
                  <div className="divide-y divide-base-200">
                    {activeBuses.map((b) => {
                      const isSelected = String(b.busId) === selectedBusId
                      return (
                        <button
                          key={b.busId}
                          type="button"
                          onClick={() => handleSelectBus(b.busId)}
                          className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors duration-150 ${isSelected ? "bg-primary/5" : "hover:bg-base-200/50"}`}
                        >
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isSelected ? "bg-primary text-primary-content" : "bg-primary/10 text-primary"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="t-label text-base-content text-xs">{b.plate}</span>
                              <StatusDot active />
                            </div>
                            <div className="text-[11px] text-base-content/50 truncate mt-0.5">{b.driverName}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs font-medium text-base-content">{b.studentCount}</div>
                            <div className="t-micro text-base-content/30">riders</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="rounded-box bg-base-100 shadow-float">
                <div className="border-b border-base-200 px-3 py-2.5">
                  <h2 className="t-label font-semibold">Alerts</h2>
                </div>
                <div className="divide-y divide-base-200">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="px-3 py-2.5">
                      <AlertBanner compact tone={alert.tone} title={alert.title} description={alert.description} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span className={`inline-block h-1.5 w-1.5 rounded-full ${active ? "bg-success" : "bg-neutral/40"}`} />
  )
}
