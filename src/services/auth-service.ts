import type { User } from "@/types/models/user"

export const loginUser = async (): Promise<{ token: string; user: User }> => {
  await new Promise((r) => setTimeout(r, 600))
  return {
    token: "dummy-jwt-token-" + Date.now(),
    user: {
      id: "1",
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
    },
  }
}

export const logoutUser = async (): Promise<void> => {
  await new Promise((r) => setTimeout(r, 200))
}
