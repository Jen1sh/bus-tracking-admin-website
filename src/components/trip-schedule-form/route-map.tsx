"use client"

import { MapContainer, TileLayer, Marker, Polyline, useMap, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { LOCATION_COORDS, DEFAULT_CENTER, DEFAULT_ZOOM } from "@/constants/trip-data"

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

function FitBounds({ start, end }: { start?: [number, number]; end?: [number, number] }) {
  const map = useMap()
  if (start && end) {
    const bounds = L.latLngBounds([start, end])
    map.fitBounds(bounds, { padding: [50, 50] })
  }
  return null
}

function findNearestLocation(lat: number, lng: number): string | null {
  let closest: string | null = null
  let minDist = Infinity
  for (const [name, [clat, clng]] of Object.entries(LOCATION_COORDS)) {
    const d = Math.sqrt((lat - clat) ** 2 + (lng - clng) ** 2)
    if (d < minDist) {
      minDist = d
      closest = name
    }
  }
  return minDist < 0.01 ? closest : null
}

interface Props {
  startLocation: string
  endLocation: string
  onSelectLocation?: (location: string) => void
}

function ClickHandler({ onSelectLocation }: { onSelectLocation?: (loc: string) => void }) {
  useMapEvents({
    click(e) {
      if (!onSelectLocation) return
      const nearest = findNearestLocation(e.latlng.lat, e.latlng.lng)
      if (nearest) onSelectLocation(nearest)
    },
  })
  return null
}

export function RouteMap({ startLocation, endLocation, onSelectLocation }: Props) {
  const startCoord = startLocation ? LOCATION_COORDS[startLocation] : undefined
  const endCoord = endLocation ? LOCATION_COORDS[endLocation] : undefined

  return (
    <div className="h-64 overflow-hidden rounded-box">
      <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} className="h-full w-full" zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onSelectLocation={onSelectLocation} />
        {startCoord && <Marker position={startCoord} />}
        {endCoord && <Marker position={endCoord} />}
        {startCoord && endCoord && (
          <Polyline positions={[startCoord, endCoord]} color="hsl(210, 60%, 50%)" weight={3} dashArray="8 4" />
        )}
        {(startCoord || endCoord) && (
          <FitBounds start={startCoord} end={endCoord} />
        )}
      </MapContainer>
    </div>
  )
}
