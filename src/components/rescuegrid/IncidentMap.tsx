import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { EmergencyReport } from '@/models/rescue';
import { priorityLabels } from '@/models/rescue';
import { Button } from '@/components/ui/button';
import { computeSilentZones, type LastPingDevice } from '@/models/blackout';
import './blackout-radar.css';
type Props={reports?:EmergencyReport[];selectedId?:string;onSelect?:(id:string)=>void;picker?:boolean;position?:[number,number];onPick?:(p:[number,number])=>void;blackoutDevices?:LastPingDevice[]};
function Controller({selectedId,reports,onPick}:Props){
 const map=useMap();useMapEvents({click(e){onPick?.([e.latlng.lat,e.latlng.lng]);}});
 useEffect(()=>{const r=reports?.find(r=>r.id===selectedId);if(r)map.flyTo([r.latitude,r.longitude],Math.max(map.getZoom(),14),{duration:.5});},[selectedId,reports,map]);
 useEffect(()=>{const timer=setTimeout(()=>map.invalidateSize(),200);return()=>clearTimeout(timer);},[map]);return null;
}
export default function IncidentMap(props:Props){
 const disconnected = props.blackoutDevices ?? [];
 const silentZones = computeSilentZones(disconnected);
 const violetIcon = L.divIcon({className:'last-ping-leaflet-icon',html:'<span class="last-ping-pin" aria-hidden="true"></span>',iconSize:[18,18],iconAnchor:[9,9]});
 return <MapContainer center={props.position??[3.075,101.613]} zoom={13} className={`incident-map ${props.picker?'picker-map':''}`} zoomControl>
 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'/>
 <Controller {...props}/>
 {props.reports?.map(r=><Marker key={`${r.id}-${r.status}-${r.priority}`} position={[r.latitude,r.longitude]} icon={L.divIcon({className:'incident-pin-wrapper',html:`<div class="incident-pin ${r.status==='resolved'?'resolved':r.priority} ${r.verification_status==='unverified'?'unverified':''} ${r.id===props.selectedId?'selected':''}"><span>+</span></div>`,iconSize:[44,44],iconAnchor:[22,22]})} eventHandlers={{click:()=>props.onSelect?.(r.id)}}><Popup><div className="map-popup"><span className="eyebrow">DEMO REPORT · {r.id}</span><strong>{r.title}</strong><p>{r.category} · {r.location_name}</p><p>{r.description}</p><p>Priority: {r.priority} · {priorityLabels[r.priority]} · {r.verification_status}</p><p>{r.affected_people} people affected · Assistance: {r.assistance_needed}</p><Button size="sm" onClick={()=>props.onSelect?.(r.id)}>View help request</Button></div></Popup></Marker>)}
 {/* Automatically aggregate nearby fictitious unreachable-device last pings. */}
 {silentZones.map(zone=><Circle key={zone.id}
   center={[zone.latitude,zone.longitude]} radius={zone.radius_meters}
   pathOptions={{color:'#c084fc',weight:2,dashArray:'5 7',fillColor:'#a855f7',fillOpacity:0.14,opacity:0.85}}
   interactive={false}>
   <Tooltip permanent direction="top" offset={[0,-14]} className="silent-zone-tooltip">
     SIMULATED SILENT ZONE · {zone.device_count} UNREACHABLE
   </Tooltip>
 </Circle>)}
 {disconnected.map(device=><Marker key={device.id}
   position={[device.latitude,device.longitude]} icon={violetIcon} zIndexOffset={650}>
   <Popup><div className="map-popup">
     <strong>Simulated last known location</strong>
     <p>Demo device: {device.id}</p>
     <p>Last reported: {new Date(device.last_seen_at).toLocaleTimeString()}</p>
     <p>Connection lost · status of person UNKNOWN</p>
     <p>This is not a confirmed injury or rescue request.</p>
   </div></Popup>
 </Marker>)}
 {props.position&&<Marker position={props.position} icon={L.divIcon({className:'incident-pin-wrapper',html:'<div class="incident-pin P1 selected"><span>+</span></div>',iconSize:[44,44],iconAnchor:[22,22]})}/>}
 </MapContainer>;}
