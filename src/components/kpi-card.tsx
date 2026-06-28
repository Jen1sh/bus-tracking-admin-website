import { type ReactNode } from "react"

interface KpiCardProps {
  title: string
  value: string | number
  description?: string
  valueColor?: string
  icon?: ReactNode
  compact?: boolean
}

export function KpiCard({ title, value, description, valueColor = "text-primary", icon, compact }: KpiCardProps) {
  return (
    <div
      className={`rounded-box border border-base-300 bg-base-100 shadow-card card-hover ${compact ? "p-3" : "p-5"}`}
    >
      <div className="flex items-center justify-between">
        <div className={`t-micro text-base-content/40 ${compact ? "" : ""}`}>{title}</div>
        {icon && <span className="text-base-content/30">{icon}</span>}
      </div>
      <div className={`${compact ? "mt-0" : "mt-1"} t-h2 ${valueColor}`}>{value}</div>
      {description && (
        <div className={`t-body text-base-content/50 ${compact ? "mt-0" : "mt-0.5"}`}>{description}</div>
      )}
    </div>
  )
}
