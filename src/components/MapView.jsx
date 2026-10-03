import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Leaflet default icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper to adjust map view dynamically
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);
  return null;
}

// Custom DivIcon for Incidents — light/white circle with colored border
function createIncidentIcon(severity) {
  let borderColor = '#dc2626'; // Critical: red
  let bgColor = '#fee2e2';
  if (severity === 'High') { borderColor = '#ea580c'; bgColor = '#fff7ed'; }
  if (severity === 'Medium') { borderColor = '#d97706'; bgColor = '#fffbeb'; }
  if (severity === 'Low') { borderColor = '#2563eb'; bgColor = '#eff6ff'; }

  const html = `
    <div style="position: relative; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; width: 30px; height: 30px; border-radius: 50%; background: ${borderColor}; opacity: 0.2; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      <div style="width: 22px; height: 22px; border-radius: 50%; background: ${bgColor}; border: 2.5px solid ${borderColor}; color: ${borderColor}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
        !
      </div>
    </div>
  `;
  return L.divIcon({ html, className: '', iconSize: [30, 30], iconAnchor: [15, 15] });
}

// Custom DivIcon for Vehicles — light background with colored border
function createVehicleIcon(status) {
  let borderColor = '#2563eb';
  let bgColor = '#eff6ff';
  let textColor = '#2563eb';
  if (status === 'Stopped') { borderColor = '#dc2626'; bgColor = '#fee2e2'; textColor = '#dc2626'; }
  if (status === 'Delayed') { borderColor = '#d97706'; bgColor = '#fffbeb'; textColor = '#d97706'; }

  const html = `
    <div style="width: 26px; height: 26px; border-radius: 4px; background: ${bgColor}; border: 2px solid ${borderColor}; color: ${textColor}; display: flex; align-items: center; justify-content: center; font-size: 13px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
      &#9656;
    </div>
  `;
  return L.divIcon({ html, className: '', iconSize: [26, 26], iconAnchor: [13, 13] });
}

export default function MapView({
  center = [27.15, 88.55],
  zoom = 9,
  incidents = [],
  vehicles = [],
  routes = [],
  selectedIncident = null,
  onSelectIncident = () => {},
  selectedVehicle = null,
  onSelectVehicle = () => {},
  layers = { incidents: true, vehicles: true, routes: true, riskZones: true },
  height = "100%"
}) {
  const [mapReady, setMapReady] = React.useState(false);

  return (
    <div className="relative w-full overflow-hidden border border-outline-variant" style={{ height }}>
      {/* Loading skeleton */}
      {!mapReady && (
        <div className="absolute inset-0 z-[1001] bg-slate-100 flex flex-col items-center justify-center gap-3 animate-pulse">
          <span className="material-symbols-outlined text-[32px] text-outline">public</span>
          <span className="text-xs font-mono text-outline">Loading GIS Map…</span>
        </div>
      )}
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="w-full h-full" whenReady={() => setMapReady(true)}>
        <ChangeView center={center} zoom={zoom} />

        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />

        {/* Route Lines */}
        {layers.routes && routes.map((route) => {
          let color = "#2563eb";
          if (route.riskCategory === "High" || route.status?.includes("Disrupted")) color = "#dc2626";
          if (route.riskCategory === "Moderate") color = "#d97706";
          if (route.riskCategory === "Low") color = "#16a34a";

          return (
            <Polyline
              key={route.id}
              positions={route.waypoints}
              pathOptions={{
                color,
                weight: route.riskCategory === "High" ? 5 : 4,
                dashArray: route.status?.includes("Disrupted") ? "8, 8" : null,
                opacity: 0.85
              }}
            >
              <Popup>
                <div style={{ fontFamily: 'sans-serif', fontSize: '12px', minWidth: '180px' }}>
                  <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{route.name}</div>
                  <div style={{ color: '#475569', fontSize: '11px' }}>
                    Distance: <span style={{ fontFamily: 'monospace', color: '#0f172a' }}>{route.distanceKm} km</span>
                    {' '} | Risk: <span style={{ fontFamily: 'monospace', fontWeight: '700', color }}>{route.riskCategory}</span>
                  </div>
                  <div style={{ color: '#64748b', fontSize: '10px', marginTop: '4px' }}>{route.recommendation}</div>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* Risk Zones (Circles) */}
        {layers.riskZones && incidents.filter(i => i.severity === "Critical" || i.severity === "High").map(incident => (
          <CircleMarker
            key={`circle-${incident.id}`}
            center={incident.coordinates}
            radius={35}
            pathOptions={{
              color: incident.severity === 'Critical' ? '#dc2626' : '#ea580c',
              fillColor: incident.severity === 'Critical' ? '#dc2626' : '#ea580c',
              fillOpacity: 0.12,
              weight: 1.5,
              dashArray: '4, 3'
            }}
          />
        ))}

        {/* Incident Markers */}
        {layers.incidents && incidents.map((inc) => (
          <Marker
            key={inc.id}
            position={inc.coordinates}
            icon={createIncidentIcon(inc.severity)}
            eventHandlers={{ click: () => onSelectIncident(inc) }}
          >
            <Popup>
              <div style={{ fontFamily: 'sans-serif', fontSize: '12px', minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', padding: '1px 6px', borderRadius: '3px', background: '#fee2e2', color: '#dc2626', fontWeight: '700', border: '1px solid #fecaca' }}>
                    {inc.type}
                  </span>
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b' }}>{inc.id}</span>
                </div>
                <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '12px' }}>{inc.title}</div>
                <div style={{ color: '#475569', fontSize: '11px', marginTop: '3px' }}>{inc.location}</div>
                <div style={{ color: '#64748b', fontSize: '10px', marginTop: '3px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {inc.description}
                </div>
                <button
                  onClick={() => onSelectIncident(inc)}
                  style={{ marginTop: '8px', width: '100%', fontSize: '11px', fontWeight: '600', background: '#2563eb', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Inspect Incident Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Vehicle Markers */}
        {layers.vehicles && vehicles.map((veh) => (
          <Marker
            key={veh.id}
            position={veh.coordinates}
            icon={createVehicleIcon(veh.status)}
            eventHandlers={{ click: () => onSelectVehicle(veh) }}
          >
            <Popup>
              <div style={{ fontFamily: 'sans-serif', fontSize: '12px', minWidth: '180px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', padding: '1px 6px', borderRadius: '3px', background: '#eff6ff', color: '#2563eb', fontWeight: '700', border: '1px solid #bfdbfe' }}>
                    {veh.id}
                  </span>
                  <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b' }}>{veh.status}</span>
                </div>
                <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '12px' }}>{veh.type}</div>
                <div style={{ color: '#475569', fontSize: '11px', marginTop: '3px' }}>
                  Speed: <span style={{ fontFamily: 'monospace', color: '#16a34a', fontWeight: '600' }}>{veh.speed} km/h</span>
                  {' '}| Fuel: <span style={{ fontFamily: 'monospace', color: '#0f172a' }}>{veh.fuelLevel}%</span>
                </div>
                <div style={{ color: '#64748b', fontSize: '10px', marginTop: '3px' }}>
                  To: <span style={{ color: '#0f172a', fontWeight: '600' }}>{veh.destination}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend Overlay — Stitch light theme */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 border border-outline-variant p-2.5 rounded shadow-md text-xs text-on-surface space-y-1.5 select-none backdrop-blur-sm">
        <div className="font-mono font-bold text-[10px] text-outline uppercase tracking-wider mb-1">Map Legend</div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-error inline-block flex-shrink-0"></span>
          <span className="text-on-surface-variant">Critical Hazard / Disrupted Route</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block flex-shrink-0"></span>
          <span className="text-on-surface-variant">Moderate Hazard / Caution</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-tertiary inline-block flex-shrink-0"></span>
          <span className="text-on-surface-variant">Operational Route</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-blue-100 border border-blue-300 inline-block flex-shrink-0 text-[9px] text-primary font-bold flex items-center justify-center">▶</span>
          <span className="text-on-surface-variant">Logistics Convoy Vehicle</span>
        </div>
      </div>

      {/* Demo data label */}
      <div className="absolute top-3 right-3 z-[1000] bg-white/90 border border-outline-variant px-2 py-1 rounded font-mono text-[9px] text-outline uppercase font-semibold tracking-wider select-none">
        Demo / Simulated Data
      </div>
    </div>
  );
}
