export type TripStatus =
  | "on-the-way"
  | "in-transit"
  | "on-board"
  | "arriving-soon"
  | "waiting"
  | "emergency"
  | "off-duty"
  | "completed"
  | "in-progress"
  | "scheduled"
  | "delayed"
  | "cancelled"
  | "active"
  | "inactive"
  | "on-duty"
  | "on-leave"
  | "pending"

const statusConfig: Record<
  string,
  { badge: string; dotColor: string; textColor: string; pulse: boolean }
> = {
  "on-the-way": { badge: "badge-ghost", dotColor: "bg-success", textColor: "text-success", pulse: true },
  "in-transit": { badge: "badge-ghost", dotColor: "bg-info", textColor: "text-info", pulse: false },
  "on-board": { badge: "badge-ghost", dotColor: "bg-success", textColor: "text-success", pulse: false },
  "arriving-soon": { badge: "badge-ghost", dotColor: "bg-warning", textColor: "text-warning", pulse: false },
  waiting: { badge: "badge-ghost", dotColor: "bg-neutral/40", textColor: "text-base-content/50", pulse: false },
  emergency: { badge: "badge-ghost", dotColor: "bg-error", textColor: "text-error", pulse: true },
  "off-duty": { badge: "badge-ghost", dotColor: "bg-neutral/40", textColor: "text-base-content/50", pulse: false },
  completed: { badge: "badge-ghost", dotColor: "bg-success", textColor: "text-success", pulse: false },
  "in-progress": { badge: "badge-ghost", dotColor: "bg-info", textColor: "text-info", pulse: true },
  scheduled: { badge: "badge-ghost", dotColor: "bg-neutral/40", textColor: "text-base-content/50", pulse: false },
  delayed: { badge: "badge-ghost", dotColor: "bg-warning", textColor: "text-warning", pulse: false },
  cancelled: { badge: "badge-ghost", dotColor: "bg-error", textColor: "text-error", pulse: false },
  active: { badge: "badge-ghost", dotColor: "bg-success", textColor: "text-success", pulse: false },
  inactive: { badge: "badge-ghost", dotColor: "bg-neutral/40", textColor: "text-base-content/50", pulse: false },
  "on-duty": { badge: "badge-ghost", dotColor: "bg-success", textColor: "text-success", pulse: false },
  "on-leave": { badge: "badge-ghost", dotColor: "bg-warning", textColor: "text-warning", pulse: false },
  pending: { badge: "badge-ghost", dotColor: "bg-warning", textColor: "text-warning", pulse: false },
}

interface StatusBadgeProps {
  status: TripStatus | string
  label?: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status.toLowerCase()] ?? {
    badge: "badge-ghost",
    dotColor: "bg-neutral/40",
    textColor: "text-base-content/50",
    pulse: false,
  }

  return (
    <span className={`badge badge-sm gap-1.5 ${config.badge} ${config.textColor}`}>
      <span
        className={`dot ${config.dotColor} ${config.pulse ? "dot-pulse" : ""}`}
      />
      {label ?? status}
    </span>
  )
}
