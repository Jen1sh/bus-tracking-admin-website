"use client"

import { createContext, useContext, useCallback, useSyncExternalStore, type ReactNode } from "react"
import type { User } from "@/types/models/user"
import { loginUser, logoutUser } from "@/services/auth-service"

interface AuthState {
  user: User
  token: string
}

interface AuthContextValue {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

let cached: { json: string; value: AuthState } | null = null

function getSnapshot(): AuthState | null {
  const storedToken = localStorage.getItem("auth_token")
  const storedUser = localStorage.getItem("auth_user")
  if (storedToken && storedUser) {
    const json = storedToken + storedUser
    if (cached && cached.json === json) return cached.value
    cached = { json, value: { token: storedToken, user: JSON.parse(storedUser) } }
    return cached.value
  }
  cached = null
  return null
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

function getServerSnapshot(): null {
  return null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const token = snapshot?.token ?? null
  const user = snapshot?.user ?? null

  const login = useCallback(async () => {
    const result = await loginUser()
    localStorage.setItem("auth_token", result.token)
    localStorage.setItem("auth_user", JSON.stringify(result.user))
    window.dispatchEvent(new StorageEvent("storage"))
  }, [])

  const logout = useCallback(async () => {
    await logoutUser()
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    window.dispatchEvent(new StorageEvent("storage"))
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
