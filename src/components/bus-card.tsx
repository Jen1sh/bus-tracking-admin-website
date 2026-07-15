import { Bus } from "lucide-react"
import { StatusBadge, type TripStatus } from "@/components/status-badge"

interface BusCardProps {
  busNumber: string
  route: string
  driver: string
  capacity: string
  status: TripStatus | string
  compact?: boolean
}

export function BusCard({ busNumber, route, driver, capacity, status, compact }: BusCardProps) {
  return (
    <div
      className={`rounded-box border border-base-300 bg-base-100 shadow-card card-hover ${compact ? "p-2.5" : "p-4"}`}
    >
      <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
        <div
          className={`flex shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ${compact ? "h-8 w-8" : "h-10 w-10"}`}
        >
          <Bus size={compact ? 16 : 20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="t-label text-base-content truncate">{busNumber}</div>
            <StatusBadge status={status} />
          </div>
          <div className={`t-body text-base-content/50 truncate ${compact ? "" : "mt-0.5"}`}>{route}</div>
        </div>
      </div>
      {!compact && (
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-base-200 pt-3">
          <div>
            <div className="t-micro text-base-content/30">Driver</div>
            <div className="t-body text-base-content">{driver}</div>
          </div>
          <div>
            <div className="t-micro text-base-content/30">Capacity</div>
            <div className="t-body text-base-content">{capacity}</div>
          </div>
        </div>
      )}
      {compact && (
        <div className="mt-2 flex items-center gap-3 text-xs text-base-content/50">
          <span>{driver}</span>
          <span className="text-base-content/20">|</span>
          <span>{capacity}</span>
        </div>
      )}
    </div>
  )
}
