import { type ReactNode } from "react"

interface NotificationCardProps {
  icon: ReactNode
  iconBg?: string
  title: string
  description: string
  timestamp: string
  compact?: boolean
}

export function NotificationCard({
  icon,
  iconBg = "bg-success",
  title,
  description,
  timestamp,
  compact,
}: NotificationCardProps) {
  return (
    <div
      className={`flex items-start rounded-box border border-base-300 bg-base-100 shadow-card card-hover ${compact ? "gap-2 p-2.5" : "gap-3 p-4"}`}
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-xl ${iconBg} text-white ${compact ? "h-8 w-8" : "h-10 w-10"}`}
      >
        <span className={compact ? "scale-75" : ""}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className={`t-label text-base-content ${compact ? "text-xs" : ""}`}>{title}</div>
        <div className={`t-body text-base-content/50 ${compact ? "text-xs mt-0" : "mt-0.5"}`}>{description}</div>
      </div>
      <span className={`t-micro text-base-content/30 shrink-0 ${compact ? "" : "pt-0.5"}`}>{timestamp}</span>
    </div>
  )
}
