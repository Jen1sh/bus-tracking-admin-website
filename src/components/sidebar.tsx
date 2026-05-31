"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/store/auth-context"

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/driver", label: "Driver" },
  { href: "/parent", label: "Parent" },
  { href: "/student", label: "Student" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.replace("/login")
  }

  return (
    <>
      <label htmlFor="sidebar-drawer" className="drawer-overlay z-40" />
      <aside className="flex min-h-full w-64 flex-col bg-base-200 text-base-content">
        <div className="flex items-center gap-2 border-b border-base-300 px-6 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-content text-sm font-bold">
            B
          </div>
          <span className="text-lg font-semibold tracking-tight">BusTrack</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${isActive ? "bg-primary/10 text-primary font-semibold" : "text-base-content/70 hover:bg-base-300 hover:text-base-content"} flex w-full items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-base-300 px-4 py-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral text-neutral-content text-sm font-semibold">
              {user?.name?.charAt(0) ?? "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user?.name ?? "User"}</p>
              <p className="truncate text-xs text-base-content/60">{user?.email ?? ""}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-ghost btn-sm mt-2 w-full justify-start gap-2 text-base-content/70 hover:text-base-content"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M17 4.25A2.25 2.25 0 0014.75 2h-5.5A2.25 2.25 0 007 4.25v2a.75.75 0 001.5 0v-2a.75.75 0 01.75-.75h5.5a.75.75 0 01.75.75v11.5a.75.75 0 01-.75.75h-5.5a.75.75 0 01-.75-.75v-2a.75.75 0 00-1.5 0v2A2.25 2.25 0 009.25 18h5.5A2.25 2.25 0 0017 15.75V4.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M1 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H1.75A.75.75 0 011 10z"
                clipRule="evenodd"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
