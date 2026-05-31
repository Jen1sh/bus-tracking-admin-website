"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { tripScheduleSchema, steps, type TripScheduleData } from "@/schemas/trip-schedule-schema"
import { StepRouteLocations } from "./step-route-locations"
import { StepTimeDriver } from "./step-time-driver"
import { StepSummary } from "./step-summary"

const stepComponents = [StepRouteLocations, StepTimeDriver, StepSummary] as const

export function TripScheduleForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<TripScheduleData>({
    resolver: zodResolver(tripScheduleSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
      startTime: "07:00",
      endTime: "07:45",
      driver: "",
      selectedDates: [],
    },
  })

  const currentStep = steps[step]
  const CurrentComponent = stepComponents[step]
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
    await new Promise((r) => setTimeout(r, 600))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8 text-success">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">Trip Scheduled!</h2>
        <p className="text-sm text-base-content/60">The trip has been created successfully.</p>
        <a href="/trips" className="btn btn-primary mt-4">Back to Trips</a>
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
        <CurrentComponent form={form} />
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={handleBack} disabled={isFirst} className="btn btn-ghost">
          Back
        </button>
        {isLast ? (
          <button type="button" onClick={handleSubmit} className="btn btn-primary">
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
