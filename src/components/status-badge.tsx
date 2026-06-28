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
  | "off-duty"
  | "on-leave"

const statusConfig: Record<
  string,
  { badge: string; dotColor: string; pulse: boolean }
> = {
  "on-the-way": { badge: "badge-success", dotColor: "bg-success", pulse: true },
  "in-transit": { badge: "badge-info", dotColor: "bg-info", pulse: false },
  "on-board": { badge: "badge-success", dotColor: "bg-success", pulse: false },
  "arriving-soon": { badge: "badge-warning", dotColor: "bg-warning", pulse: false },
  waiting: { badge: "badge-ghost", dotColor: "bg-neutral/40", pulse: false },
  emergency: { badge: "badge-error", dotColor: "bg-error", pulse: true },
  "off-duty": { badge: "badge-ghost", dotColor: "bg-neutral/40", pulse: false },
  completed: { badge: "badge-success", dotColor: "bg-success", pulse: false },
  "in-progress": { badge: "badge-info", dotColor: "bg-info", pulse: true },
  scheduled: { badge: "badge-ghost", dotColor: "bg-neutral/40", pulse: false },
  delayed: { badge: "badge-warning", dotColor: "bg-warning", pulse: false },
  cancelled: { badge: "badge-error", dotColor: "bg-error", pulse: false },
  active: { badge: "badge-success", dotColor: "bg-success", pulse: false },
  inactive: { badge: "badge-ghost", dotColor: "bg-neutral/40", pulse: false },
  "on-duty": { badge: "badge-success", dotColor: "bg-success", pulse: false },
  "on-leave": { badge: "badge-warning", dotColor: "bg-warning", pulse: false },
}

interface StatusBadgeProps {
  status: TripStatus | string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status.toLowerCase()] ?? {
    badge: "badge-ghost",
    dotColor: "bg-neutral/40",
    pulse: false,
  }

  return (
    <span className={`badge badge-sm gap-1.5 ${config.badge}`}>
      <span
        className={`dot ${config.dotColor} ${config.pulse ? "dot-pulse" : ""}`}
      />
      {status}
    </span>
  )
}
