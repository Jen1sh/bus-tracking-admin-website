"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/store/auth-context"

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async () => {
    await login()
    router.replace("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body items-center gap-6 py-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-content text-2xl font-bold shadow-sm">
            B
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">BusTrack</h1>
            <p className="mt-1 text-sm text-base-content/60">Admin Portal</p>
          </div>

          <button onClick={handleLogin} className="btn btn-primary btn-wide mt-2">
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  )
}
