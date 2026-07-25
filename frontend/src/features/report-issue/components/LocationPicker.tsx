import { useEffect } from 'react';
import { AlertCircle, LoaderCircle, LocateFixed, MapPin } from 'lucide-react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Button } from '../../../components/ui/button';
import { DEFAULT_MAP_CENTER } from '../constants';
import type { Coordinates, LocationSelection } from '../types';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getPinLabel = ({ lat, lng }: Coordinates) => `Pinned location: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;

function MapClickHandler({ onSelect }: { onSelect: (coordinates: Coordinates) => void }) {
  useMapEvents({ click: (event) => onSelect({ lat: event.latlng.lat, lng: event.latlng.lng }) });
  return null;
}

function MapViewport({ location }: { location: LocationSelection | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) map.flyTo([location.lat, location.lng], Math.max(map.getZoom(), 15));
  }, [location, map]);
  return null;
}

interface LocationPickerProps {
  location: LocationSelection | null;
  error: string | null;
  isLocating: boolean;
  onLocationSelect: (location: LocationSelection) => void;
  onUseCurrentLocation: () => void;
}

export function LocationPicker({ location, error, isLocating, onLocationSelect, onUseCurrentLocation }: LocationPickerProps) {
  const selectCoordinates = (coordinates: Coordinates) => onLocationSelect({ ...coordinates, label: getPinLabel(coordinates) });

  return (
    <div className="space-y-6 px-6 py-8 sm:px-10">
      <div><h2 className="text-xl font-bold text-slate-900">Select the issue location</h2><p className="mt-1 text-sm text-slate-500">Click the map to place a pin, or use your current location.</p></div>
      <div className="flex flex-col gap-3 sm:flex-row"><Button type="button" onClick={onUseCurrentLocation} disabled={isLocating} className="gap-2">{isLocating ? <LoaderCircle className="animate-spin" size={17} /> : <LocateFixed size={17} />}{isLocating ? 'Finding your location…' : 'Use my current location'}</Button><p className="flex items-center gap-2 text-sm text-slate-500"><MapPin size={16} className="text-primary" />{location?.label ?? 'No location selected yet'}</p></div>
      {error && <p role="alert" className="flex items-center gap-2 text-sm text-red-600"><AlertCircle size={16} />{error}</p>}
      <div className="h-[420px] overflow-hidden rounded-2xl border border-slate-200"><MapContainer center={DEFAULT_MAP_CENTER} zoom={13} className="h-full w-full" scrollWheelZoom><TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution="&copy; OpenStreetMap contributors &copy; CARTO" /><MapClickHandler onSelect={selectCoordinates} /><MapViewport location={location} />{location && <Marker position={[location.lat, location.lng]} />}</MapContainer></div>
    </div>
  );
}
