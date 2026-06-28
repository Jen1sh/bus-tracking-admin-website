"use client"

import { type ReactNode } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Sidebar } from "@/components/sidebar"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="drawer lg:drawer-open">
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-base-300 bg-base-100/80 px-4 py-3 backdrop-blur-md lg:hidden">
            <label htmlFor="sidebar-drawer" className="btn btn-ghost btn-sm drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </label>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-content text-xs font-bold">
                B
              </div>
              <span className="font-semibold">BusTrack</span>
            </div>
          </div>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
        <div className="drawer-side z-50">
          <Sidebar />
        </div>
      </div>
    </AuthGuard>
  )
}
