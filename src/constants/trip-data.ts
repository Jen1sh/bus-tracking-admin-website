export const LOCATIONS = [
  "Maple St Station",
  "Oak Ave Hub",
  "Pine St Terminal",
  "Elm St Stop",
  "Central Depot",
  "River Rd Station",
] as const

export const DRIVERS = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
  { id: "4", name: "Sarah Lee" },
  { id: "5", name: "Tom Brown" },
] as const

export const LOCATION_COORDS: Record<string, [number, number]> = {
  "Maple St Station": [42.3601, -71.0589],
  "Oak Ave Hub": [42.365, -71.062],
  "Pine St Terminal": [42.355, -71.055],
  "Elm St Stop": [42.37, -71.065],
  "Central Depot": [42.35, -71.06],
  "River Rd Station": [42.375, -71.068],
}

export const DEFAULT_CENTER: [number, number] = [42.36, -71.06]
export const DEFAULT_ZOOM = 13
