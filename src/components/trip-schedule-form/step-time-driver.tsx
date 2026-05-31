"use client"

import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import type { UseFormReturn } from "react-hook-form"
import type { TripScheduleData } from "@/schemas/trip-schedule-schema"
import { DRIVERS } from "@/constants/trip-data"
import "react-day-picker/style.css"

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"))
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"))

function TimePicker({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (v: string) => void
  label: string
}) {
  const [h, m] = (value || "07:00").split(":")
  const hourNum = Number.parseInt(h)
  const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum
  const period = hourNum >= 12 ? "PM" : "AM"

  const update = (dh: number, dm: number, dp: string) => {
    let hr = dh
    if (dp === "PM" && dh !== 12) hr += 12
    if (dp === "AM" && dh === 12) hr = 0
    onChange(`${String(hr).padStart(2, "0")}:${String(dm).padStart(2, "0")}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="label-text whitespace-nowrap text-sm">{label}</span>
      <div className="join">
        <select
          className="select select-bordered select-sm join-item w-18"
          value={displayHour}
          onChange={(e) => update(Number(e.target.value), Number.parseInt(m), period)}
        >
          {HOURS.map((h) => (
            <option key={h} value={Number.parseInt(h)}>{h}</option>
          ))}
        </select>
        <span className="join-item flex items-center px-0.5 text-xs text-base-content/40">:</span>
        <select
          className="select select-bordered select-sm join-item w-18"
          value={Number.parseInt(m)}
          onChange={(e) => update(displayHour, Number(e.target.value), period)}
        >
          {MINUTES.map((m) => (
            <option key={m} value={Number.parseInt(m)}>{m}</option>
          ))}
        </select>
        <select
          className="select select-bordered select-sm join-item w-20"
          value={period}
          onChange={(e) => update(displayHour, Number.parseInt(m), e.target.value)}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  )
}

interface Props {
  form: UseFormReturn<TripScheduleData>
}

export function StepTimeDriver({ form }: Props) {
  const { register, setValue, watch, formState: { errors } } = form
  const selectedDates = watch("selectedDates") ?? []

  return (
    <div className="space-y-6">
      <div className="form-control w-full">
        <label className="label" htmlFor="driver">
          <span className="label-text font-medium">Assign Driver</span>
        </label>
        <select
          id="driver"
          className="select select-bordered w-full"
          {...register("driver")}
        >
          <option value="">Select a driver</option>
          {DRIVERS.map((d) => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </select>
        {errors.driver && (
          <span className="mt-1 text-xs text-error">{errors.driver.message}</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <TimePicker
          label="Start Time"
          value={watch("startTime")}
          onChange={(v) => setValue("startTime", v, { shouldValidate: true })}
        />
        <TimePicker
          label="End Time"
          value={watch("endTime")}
          onChange={(v) => setValue("endTime", v, { shouldValidate: true })}
        />
      </div>
      {errors.startTime && (
        <span className="mt-1 block text-xs text-error">{errors.startTime.message}</span>
      )}
      {errors.endTime && (
        <span className="mt-1 block text-xs text-error">{errors.endTime.message}</span>
      )}

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium">Trip Dates</span>
        </label>
        <div className="flex justify-center rounded-box border border-base-300 bg-base-100 p-4">
          <DayPicker
            mode="multiple"
            selected={selectedDates}
            onSelect={(dates) => setValue("selectedDates", dates ?? [], { shouldValidate: true })}
            disabled={{ before: new Date() }}
            min={1}
            required
          />
        </div>
        {errors.selectedDates && (
          <span className="mt-1 block text-xs text-error">{errors.selectedDates.message}</span>
        )}
        {selectedDates.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {selectedDates.map((d) => (
              <span key={d.toISOString()} className="badge badge-ghost badge-sm">
                {format(d, "MMM d, yyyy")}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
