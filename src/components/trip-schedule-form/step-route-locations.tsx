"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import type { UseFormReturn } from "react-hook-form"
import type { TripScheduleData } from "@/schemas/trip-schedule-schema"
import { LOCATIONS } from "@/constants/trip-data"

const RouteMap = dynamic(() => import("./route-map").then((m) => ({ default: m.RouteMap })), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center rounded-box bg-base-200 text-sm text-base-content/40">
      Loading map…
    </div>
  ),
})

interface Props {
  form: UseFormReturn<TripScheduleData>
}

export function StepRouteLocations({ form }: Props) {
  const { setValue, watch, formState: { errors } } = form
  const startLocation = watch("startLocation")
  const endLocation = watch("endLocation")
  const [editTarget, setEditTarget] = useState<"start" | "end">("start")

  const availableEndLocations = LOCATIONS.filter((loc) => loc !== startLocation)
  const availableStartLocations = LOCATIONS.filter((loc) => loc !== endLocation)

  const handleMapSelect = (location: string) => {
    if (editTarget === "start") {
      setValue("startLocation", location, { shouldValidate: true })
    } else {
      setValue("endLocation", location, { shouldValidate: true })
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="form-control w-full">
          <label className="label" htmlFor="startLocation">
            <span className="label-text font-medium">Start Location</span>
          </label>
          <select
            id="startLocation"
            className="select select-bordered w-full"
            value={startLocation}
            onChange={(e) => setValue("startLocation", e.target.value, { shouldValidate: true })}
          >
            <option value="">Select start</option>
            {availableStartLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          {errors.startLocation && (
            <span className="mt-1 text-xs text-error">{errors.startLocation.message}</span>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label" htmlFor="endLocation">
            <span className="label-text font-medium">End Location</span>
          </label>
          <select
            id="endLocation"
            className="select select-bordered w-full"
            value={endLocation}
            onChange={(e) => setValue("endLocation", e.target.value, { shouldValidate: true })}
          >
            <option value="">Select end</option>
            {availableEndLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          {errors.endLocation && (
            <span className="mt-1 text-xs text-error">{errors.endLocation.message}</span>
          )}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-medium text-base-content/50 uppercase tracking-wider">Route Preview</span>
          <span className="text-xs text-base-content/30">—</span>
          <span className="text-xs text-base-content/40">Click map to set:</span>
          <div className="join">
            <button
              type="button"
              onClick={() => setEditTarget("start")}
              className={`join-item btn btn-xs ${editTarget === "start" ? "btn-primary" : "btn-ghost"}`}
            >
              Start
            </button>
            <button
              type="button"
              onClick={() => setEditTarget("end")}
              className={`join-item btn btn-xs ${editTarget === "end" ? "btn-primary" : "btn-ghost"}`}
            >
              End
            </button>
          </div>
        </div>
        <RouteMap
          startLocation={startLocation}
          endLocation={endLocation}
          onSelectLocation={handleMapSelect}
        />
      </div>
    </div>
  )
}
