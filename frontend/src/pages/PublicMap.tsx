import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, Filter, AlertTriangle, CheckCircle2, Clock, MapPin } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const mockIncidents = [
  { id: 1, pos: [12.9716, 77.5946], title: 'Deep Pothole', status: 'Pending', type: 'Roads' },
  { id: 2, pos: [12.9750, 77.5900], title: 'Water Leak', status: 'In Progress', type: 'Water' },
  { id: 3, pos: [12.9680, 77.6000], title: 'Streetlight out', status: 'Resolved', type: 'Electrical' },
  { id: 4, pos: [12.9650, 77.5850], title: 'Garbage dump', status: 'Pending', type: 'Sanitation' },
];

export const PublicMap = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-full lg:w-96 bg-white dark:bg-background-darkAlt border-r border-slate-200 dark:border-slate-800 flex flex-col z-10 shadow-xl">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Civic Issues Map</h2>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Search location or issue..." className="pl-10 rounded-full bg-slate-100 dark:bg-slate-900" />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Filter size={14} /> Filter Status
            </h3>
            <div className="flex flex-wrap gap-2">
              {['All', 'Pending', 'In Progress', 'Resolved'].map(status => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                    activeFilter === status 
                      ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Recent Reports</h3>
          
          {mockIncidents.filter(i => activeFilter === 'All' || i.status === activeFilter).map(incident => (
            <Card key={incident.id} className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`mt-1 rounded-full p-1.5 ${
                  incident.status === 'Resolved' ? 'bg-green-100 text-green-600' :
                  incident.status === 'In Progress' ? 'bg-orange-100 text-orange-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {incident.status === 'Resolved' ? <CheckCircle2 size={16} /> :
                   incident.status === 'In Progress' ? <Clock size={16} /> :
                   <AlertTriangle size={16} />}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{incident.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin size={10} /> Bangalore Center
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-[10px] py-0">{incident.type}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-slate-100 dark:bg-slate-900">
        <MapContainer 
          center={[12.9716, 77.5946]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {mockIncidents.map((incident) => (
             <Marker position={incident.pos as [number, number]} key={incident.id}>
              <Popup className="rounded-xl overflow-hidden">
                <div className="p-1">
                  <h4 className="font-bold text-sm mb-1">{incident.title}</h4>
                  <p className="text-xs text-slate-500 mb-2">{incident.type}</p>
                  <Badge variant={
                    incident.status === 'Resolved' ? 'success' : 
                    incident.status === 'In Progress' ? 'warning' : 'destructive'
                  }>{incident.status}</Badge>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Overlay Gradients for Depth */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 to-transparent pointer-events-none z-[400]"></div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-[400]"></div>
      </div>
    </div>
  );
};
