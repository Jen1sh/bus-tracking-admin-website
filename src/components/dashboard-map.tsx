"use client"

import { useMemo } from "react"
import { useJsApiLoader, GoogleMap, OverlayView } from "@react-google-maps/api"
import { Bus } from "lucide-react"
import type { BusLiveResponse } from "@/types/models/bus"

const containerStyle = {
  width: "100%",
  height: "100%",
}

const DEFAULT_CENTER = { lat: 42.36, lng: -71.06 }
const DEFAULT_ZOOM = 13

interface DashboardMapProps {
  buses: BusLiveResponse[]
}

function BusMapMarker({ bus }: { bus: BusLiveResponse & { latitude: number; longitude: number } }) {
  return (
    <OverlayView
      position={{ lat: bus.latitude, lng: bus.longitude }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({ x: -(width / 2), y: -height })}
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-1.5 rounded-full bg-primary/20" />
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-sm">
            <Bus size={16} className="text-white" />
          </div>
        </div>
        <span className="mt-1 whitespace-nowrap rounded bg-base-100 px-1.5 py-0.5 text-[10px] font-medium text-base-content shadow-sm">
          {bus.displayId}
        </span>
      </div>
    </OverlayView>
  )
}

export function DashboardMap({ buses }: DashboardMapProps) {
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

  const positioned = useMemo(() => buses.filter((b) => b.latitude != null && b.longitude != null), [buses])

  if (!isLoaded) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-box bg-base-200 lg:h-[400px]">
        <span className="loading loading-spinner loading-md text-primary" />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-box bg-base-100 shadow-card">
      <div className="h-[300px] lg:h-[400px]">
        <GoogleMap mapContainerStyle={containerStyle} center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} options={mapOptions}>
          {positioned.map((b) => (
            <BusMapMarker key={b.busId} bus={b as BusLiveResponse & { latitude: number; longitude: number }} />
          ))}
        </GoogleMap>
      </div>
    </div>
  )
}
