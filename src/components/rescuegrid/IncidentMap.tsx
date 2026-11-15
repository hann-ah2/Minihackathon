import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { EmergencyReport } from '@/models/rescue';
import { priorityLabels, statusLabels } from '@/models/rescue';
import { Button } from '@/components/ui/button';
type Props = { reports?: EmergencyReport[]; selectedId?: string; onSelect?: (id: string) => void; onMission?: (id: string) => void; picker?: boolean; position?: [number, number]; onPick?: (p: [number, number]) => void };
function Controller({ selectedId, reports, onPick }: Props) {
 const map = useMap(); useMapEvents({ click(e) { onPick?.([e.latlng.lat, e.latlng.lng]); } });
 useEffect(() => { const r = reports?.find(r => r.id === selectedId); if (r) map.flyTo([r.latitude,r.longitude], Math.max(map.getZoom(),14), { duration: .5 }); }, [selectedId, reports, map]);
 useEffect(() => { const timer = setTimeout(() => map.invalidateSize(), 200); return () => clearTimeout(timer); }, [map]);
 return null;
}
export default function IncidentMap(props: Props) {
 return <MapContainer center={props.position ?? [3.075,101.613]} zoom={14} className={`incident-map ${props.picker ? 'picker-map' : ''}`} zoomControl={true}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
  <Controller {...props}/>
  {props.reports?.map(r => <Marker key={`${r.id}-${r.status}-${r.priority}`} position={[r.latitude,r.longitude]} icon={L.divIcon({ className: 'incident-pin-wrapper', html: `<div class="incident-pin ${r.status === 'resolved' ? 'resolved' : r.priority} ${r.verification_status === 'unverified' ? 'unverified' : ''} ${r.id === props.selectedId ? 'selected' : ''}"><span>${r.category === 'Flood' ? '≈' : '+'}</span></div>`, iconSize: [36,36], iconAnchor:[18,18] })} eventHandlers={{ click: () => props.onSelect?.(r.id) }}><Popup><div className="map-popup"><span className="eyebrow">FICTIONAL · {r.id}</span><strong>{r.title}</strong><p>{r.category} · {r.location_name}</p><p>{r.description}</p><p>{r.priority} {priorityLabels[r.priority]} · {r.verification_status}</p><p>{statusLabels[r.status]} · {r.assigned_team_id ? `Team ${r.assigned_team_id}` : 'Unassigned'}</p><Button size="sm" onClick={() => props.onMission?.(r.id)}>View Mission</Button></div></Popup></Marker>)}
  {props.position && <Marker position={props.position} icon={L.divIcon({ className:'incident-pin-wrapper', html:'<div class="incident-pin P1 selected"><span>+</span></div>',iconSize:[36,36],iconAnchor:[18,18] })}/>}
 </MapContainer>;
}
