"use client"

import { useState, useCallback, useMemo } from "react"
import { useJsApiLoader, GoogleMap, OverlayView } from "@react-google-maps/api"
import { DEFAULT_CENTER, DEFAULT_ZOOM, LOCATION_COORDS } from "@/constants/trip-data"

const containerStyle = {
  width: "100%",
  height: "100%",
}

const buses = [
  { id: "Bus #12", pos: LOCATION_COORDS["Maple St Station"], route: "Route 5" },
  { id: "Bus #07", pos: LOCATION_COORDS["Oak Ave Hub"], route: "Route 3" },
  { id: "Bus #05", pos: LOCATION_COORDS["Central Depot"], route: "Route 2" },
  { id: "Bus #03", pos: LOCATION_COORDS["Pine St Terminal"], route: "Route 1" },
  { id: "Bus #09", pos: LOCATION_COORDS["Elm St Stop"], route: "Route 4" },
  { id: "Bus #15", pos: LOCATION_COORDS["River Rd Station"], route: "Route 6" },
]

function BusMapMarker({ bus, visible }: { bus: (typeof buses)[0]; visible: boolean }) {
  if (!visible) return null
  return (
    <OverlayView
      position={{ lat: bus.pos[0], lng: bus.pos[1] }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({ x: -(width / 2), y: -height })}
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-1.5 rounded-full bg-primary/20" />
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-white">
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
          </div>
        </div>
        <span className="mt-1 whitespace-nowrap rounded bg-base-100 px-1.5 py-0.5 text-[10px] font-medium text-base-content">
          {bus.id}
        </span>
        <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-success dot-pulse" />
      </div>
    </OverlayView>
  )
}

export function DashboardMap() {
  const [selectedBus, setSelectedBus] = useState<string | null>(null)

  const toggleBus = useCallback((id: string) => {
    setSelectedBus((prev) => (prev === id ? null : id))
  }, [])

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "",
  })

  const mapOptions = useMemo(
    () => ({
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    }),
    [],
  )

  if (!isLoaded) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-box bg-base-200 lg:h-[400px]">
        <span className="loading loading-spinner loading-md text-primary" />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-box bg-base-100 shadow-card">
      <div className="border-b border-base-200 px-3 py-2">
        <span className="t-label font-semibold text-base-content">Buses</span>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {buses.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => toggleBus(b.id)}
              className={`badge badge-sm cursor-pointer border-none gap-1.5 px-3 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${selectedBus === b.id ? "badge-primary" : "badge-outline hover:bg-primary/10"}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${selectedBus === b.id ? "bg-white" : "bg-success"}`} />
              {b.id}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] lg:h-[400px]">
        <GoogleMap mapContainerStyle={containerStyle} center={{ lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] }} zoom={DEFAULT_ZOOM} options={mapOptions}>
          {buses.map((bus) => (
            <BusMapMarker key={bus.id} bus={bus} visible={selectedBus === null || selectedBus === bus.id} />
          ))}
        </GoogleMap>
      </div>
    </div>
  )
}
