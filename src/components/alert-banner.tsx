import { type ReactNode } from "react"

type AlertTone = "warning" | "info" | "success" | "error"

interface AlertBannerProps {
  tone: AlertTone
  icon: ReactNode
  title: string
  description?: string
  compact?: boolean
}

const toneStyles: Record<AlertTone, { bg: string; border: string; iconColor: string; titleColor: string }> = {
  warning: {
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconColor: "text-warning",
    titleColor: "text-warning",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconColor: "text-info",
    titleColor: "text-info",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-100",
    iconColor: "text-success",
    titleColor: "text-success",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-100",
    iconColor: "text-error",
    titleColor: "text-error",
  },
}

export function AlertBanner({ tone, icon, title, description, compact }: AlertBannerProps) {
  const s = toneStyles[tone]

  return (
    <div className={`flex items-start rounded-xl ${s.bg} border ${s.border} ${compact ? "gap-2 p-2.5" : "gap-3 p-4"}`}>
      <span className={`${compact ? "" : "mt-0.5"} ${s.iconColor}`}>{icon}</span>
      <div className="flex-1 min-w-0">
        <div className={`t-label ${s.titleColor} ${compact ? "text-xs" : ""}`}>{title}</div>
        {description && (
          <div className={`t-body text-base-content/50 ${compact ? "mt-0 text-xs" : "mt-0.5"}`}>{description}</div>
        )}
      </div>
    </div>
  )
}
