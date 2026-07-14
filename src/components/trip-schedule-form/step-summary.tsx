"use client"

import { format } from "date-fns"
import type { UseFormReturn } from "react-hook-form"
import type { TripScheduleData } from "@/schemas/trip-schedule-schema"
import type { DriverUserResponse } from "@/types/models/driver"
import type { BusSummaryResponse } from "@/types/models/bus"

interface Props {
  form: UseFormReturn<TripScheduleData>
  drivers: DriverUserResponse[]
  buses: BusSummaryResponse[]
}

function displayTime(val: string) {
  if (!val) return "—"
  const [h, m] = val.split(":").map(Number)
  const period = h >= 12 ? "PM" : "AM"
  const display = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${display}:${String(m).padStart(2, "0")} ${period}`
}

export function StepSummary({ form, drivers, buses }: Props) {
  const { watch } = form
  const data = watch()

  const selectedDriver = drivers.find((d) => d.id === data.driverId)
  const selectedBus = buses.find((b) => b.id === data.busId)

  return (
    <div className="space-y-5">
      <div className="rounded-box border border-base-300 bg-base-100 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50">Route</h3>
        <div className="mt-3 flex items-center gap-3 text-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
            A
          </div>
          <p className="font-medium">{data.startLocation || "—"}</p>
        </div>
        <div className="my-2 ml-4 h-5 w-0.5 border-l-2 border-dashed border-base-300" />
        <div className="flex items-center gap-3 text-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 text-secondary text-xs font-bold">
            B
          </div>
          <p className="font-medium">{data.endLocation || "—"}</p>
        </div>
      </div>

      <div className="rounded-box border border-base-300 bg-base-100 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50">Bus</h3>
        <p className="mt-2 text-sm font-medium">{selectedBus ? `${selectedBus.displayId} — ${selectedBus.plate}` : "—"}</p>
      </div>

      <div className="rounded-box border border-base-300 bg-base-100 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50">Driver</h3>
        <p className="mt-2 text-sm font-medium">{selectedDriver?.name ?? "—"}</p>
      </div>

      <div className="rounded-box border border-base-300 bg-base-100 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50">Time</h3>
        <p className="mt-2 text-sm font-medium">
          {displayTime(data.startTime)} — {displayTime(data.endTime)}
        </p>
      </div>

      <div className="rounded-box border border-base-300 bg-base-100 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
          Trip Dates ({data.selectedDates?.length ?? 0})
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {data.selectedDates?.map((d) => (
            <span key={d.toISOString()} className="badge badge-primary badge-sm">
              {format(d, "MMM d, yyyy")}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
