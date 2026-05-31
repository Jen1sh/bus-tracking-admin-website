import { z } from "zod"

export const tripScheduleSchema = z.object({
  startLocation: z.string().min(1, "Select a start location"),
  endLocation: z.string().min(1, "Select an end location"),
  startTime: z.string().min(1, "Enter start time"),
  endTime: z.string().min(1, "Enter end time"),
  driver: z.string().min(1, "Select a driver"),
  selectedDates: z.array(z.date()).min(1, "Pick at least one date"),
})

export type TripScheduleData = z.infer<typeof tripScheduleSchema>

export interface StepConfig {
  id: number
  title: string
  description: string
  fields: (keyof TripScheduleData)[]
}

export const steps: StepConfig[] = [
  {
    id: 1,
    title: "Route",
    description: "Select start and end locations",
    fields: ["startLocation", "endLocation"],
  },
  {
    id: 2,
    title: "Driver, Time & Dates",
    description: "Assign driver, set time, and pick trip dates",
    fields: ["driver", "startTime", "endTime", "selectedDates"],
  },
  {
    id: 3,
    title: "Summary",
    description: "Review and confirm your trip schedule",
    fields: [],
  },
]
