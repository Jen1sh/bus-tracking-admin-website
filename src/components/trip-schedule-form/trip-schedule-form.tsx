"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { tripScheduleSchema, steps, type TripScheduleData } from "@/schemas/trip-schedule-schema"
import useTrip from "@/hooks/use-trip"
import useDriver from "@/hooks/use-driver"
import useBus from "@/hooks/use-bus"
import { StepRouteLocations } from "./step-route-locations"
import { StepTimeDriver } from "./step-time-driver"
import { StepSummary } from "./step-summary"
import { format } from "date-fns"

export function TripScheduleForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  const { useCreateTrip } = useTrip()
  const { useDrivers } = useDriver()
  const { useBusList } = useBus()

  const { data: driversRes } = useDrivers({
    limit: 200,
    search: "",
    status: "ACTIVE",
    sortBy: "name",
    sortOrder: "asc",
  })

  const { data: busesRes } = useBusList({ search: "", status: "ongoing" })

  const drivers = useMemo(() => {
    if (!driversRes) return []
    return driversRes.pages.flatMap((p) => p.data.items)
  }, [driversRes])

  const buses = useMemo(() => busesRes?.data ?? [], [busesRes])

  const createMutation = useCreateTrip()

  const form = useForm<TripScheduleData>({
    resolver: zodResolver(tripScheduleSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
      startTime: "07:00",
      endTime: "07:45",
      busId: 0,
      driverId: 0,
      selectedDates: [],
    },
  })

  const currentStep = steps[step]
  const isFirst = step === 0
  const isLast = step === steps.length - 1

  const handleNext = async () => {
    if (currentStep.fields.length === 0) return
    const valid = await form.trigger(currentStep.fields as unknown as (keyof TripScheduleData)[])
    if (!valid) return
    setStep((s) => s + 1)
  }

  const handleBack = () => {
    if (isFirst) return
    setStep((s) => s - 1)
  }

  const handleSubmit = async () => {
    const data = form.getValues()
    createMutation.mutate(
      {
        busId: data.busId,
        driverId: data.driverId,
        startTime: data.startTime,
        dates: data.selectedDates.map((d) => format(d, "yyyy-MM-dd")),
      },
      {
        onSuccess: () => router.push("/trips"),
      },
    )
  }

  const isSubmitting = createMutation.isPending

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-sm text-base-content/60">Creating trips...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <ul className="steps steps-horizontal w-full">
        {steps.map((s, i) => (
          <li
            key={s.id}
            className={`step ${i <= step ? "step-primary" : ""}`}
            data-content={i < step ? "✓" : i === step ? "●" : ""}
          >
            {s.title}
          </li>
        ))}
      </ul>

      <div>
        <h2 className="text-xl font-bold">{currentStep.title}</h2>
        <p className="mt-1 text-sm text-base-content/60">{currentStep.description}</p>
      </div>

      <div className="rounded-box border border-base-300 bg-base-100 p-6">
        {step === 0 && <StepRouteLocations form={form} />}
        {step === 1 && <StepTimeDriver form={form} drivers={drivers} buses={buses} />}
        {step === 2 && <StepSummary form={form} drivers={drivers} buses={buses} />}
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={handleBack} disabled={isFirst} className="btn btn-ghost">
          Back
        </button>
        {isLast ? (
          <button type="button" onClick={handleSubmit} className="btn btn-primary" disabled={isSubmitting}>
            Confirm Schedule
          </button>
        ) : (
          <button type="button" onClick={handleNext} className="btn btn-primary">
            Next
          </button>
        )}
      </div>
    </div>
  )
}
