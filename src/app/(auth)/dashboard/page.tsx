"use client"

import { useState } from "react"
import { KpiCard } from "@/components/kpi-card"
import { NotificationCard } from "@/components/notification-card"
import { AlertBanner } from "@/components/alert-banner"
import { DashboardMap } from "@/components/dashboard-map"
import { BusCard } from "@/components/bus-card"

export default function DashboardPage() {
  const [mapKey, setMapKey] = useState(0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="t-h1">Dashboard</h1>
          <p className="t-body text-base-content/50 mt-0.5">Overview of your bus tracking system</p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className="btn btn-ghost btn-xs gap-1" aria-label="Export">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            Export
          </button>
          <button type="button" onClick={() => setMapKey((k) => k + 1)} className="btn btn-ghost btn-xs gap-1" aria-label="Refresh dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
              <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Buses"
          value={24}
          description="12 active now"
          compact
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
          }
        />
        <KpiCard
          title="Drivers"
          value={32}
          description="28 on duty"
          valueColor="text-secondary"
          compact
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
          }
        />
        <KpiCard
          title="Students"
          value="1,280"
          description="95% attendance"
          valueColor="text-accent"
          compact
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25a.75.75 0 001.5 0v-8.25l6.75-3.728v4.662a.75.75 0 001.5 0V6.443zM1.5 15.234V7.273l2.25 1.242v4.441a3.75 3.75 0 002.487 3.548l2.938.979a.75.75 0 00.46 0l2.938-.98a3.75 3.75 0 002.487-3.548v-4.44L9 7.273v8.25a.75.75 0 01-1.5 0v-5.33l-4.5-2.485v7.278a.75.75 0 01-1.5 0z" />
            </svg>
          }
        />
        <KpiCard
          title="Routes"
          value={18}
          description="All operational"
          compact
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.732a1 1 0 011.32.257l.687.91a1 1 0 01.203.845l-.49 1.97c.33.392.615.822.848 1.283l1.475.294a1 1 0 01.804.98v1.36a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.732 1.25a1 1 0 01-.257 1.32l-.91.687a1 1 0 01-.845.203l-1.97-.49a6.973 6.973 0 01-1.283.848l-.294 1.475a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.968 6.968 0 01-1.416-.587l-1.25.732a1 1 0 01-1.32-.257l-.687-.91a1 1 0 01-.203-.845l.49-1.97A6.97 6.97 0 013.16 12.22l-1.475-.294a1 1 0 01-.804-.98V9.586a1 1 0 01.804-.98l1.473-.295q.268-.746.587-1.416l-.732-1.25a1 1 0 01.257-1.32l.91-.687a1 1 0 01.845-.203l1.97.49a6.9 6.9 0 011.283-.848l.294-1.474zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          }
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 items-start">
        <DashboardMap key={mapKey} />

        <div className="flex flex-col gap-4">
          <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-card card-hover">
            <h2 className="t-label font-semibold mb-2">Recent Activity</h2>
            <div className="space-y-2">
              {[
                { title: "Bus #12 arrived at Maple St stop", description: "Scheduled stop completed", time: "2 min ago" },
                { title: "Route 5 completed", description: "Driver John D. finished at 8:45 AM", time: "15 min ago" },
                { title: "New student assigned", description: "Sarah K. assigned to Bus #8", time: "1 hr ago" },
                { title: "Route 3 schedule updated", description: "Afternoon times adjusted", time: "2 hrs ago" },
              ].map((item, i) => (
                <NotificationCard
                  key={i}
                  compact
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  }
                  iconBg={i === 2 ? "bg-info" : "bg-success"}
                  title={item.title}
                  description={item.description}
                  timestamp={item.time}
                />
              ))}
            </div>
          </div>

          <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-card card-hover">
            <h2 className="t-label font-semibold mb-2">Active Buses</h2>
            <div className="space-y-2">
              <BusCard busNumber="Bus #12" route="Route 5 — Maple St → Central Depot" driver="John D." capacity="48/48" status="active" compact />
              <BusCard busNumber="Bus #07" route="Route 3 — Oak Ave → Pine St" driver="Jane S." capacity="42/48" status="on-route" compact />
              <BusCard busNumber="Bus #05" route="Route 2 — Central Depot → River Rd" driver="Mike J." capacity="36/48" status="on-route" compact />
              <BusCard busNumber="Bus #03" route="Route 1 — Pine St → Elm St" driver="Sarah L." capacity="44/48" status="arriving-soon" compact />
            </div>
          </div>

          <div className="rounded-box border border-base-300 bg-base-100 p-3 shadow-card card-hover">
            <h2 className="t-label font-semibold mb-2">Alerts</h2>
            <div className="space-y-2">
              <AlertBanner
                compact
                tone="warning"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                }
                title="Bus #07 maintenance due in 3 days"
                description="Schedule service appointment"
              />
              <AlertBanner
                compact
                tone="info"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                  </svg>
                }
                title="Driver license renewal pending"
                description="5 drivers need to update their licenses"
              />
              <AlertBanner
                compact
                tone="success"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                }
                title="All GPS trackers online"
                description="System fully operational"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
