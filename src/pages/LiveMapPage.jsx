import React, { useState } from 'react';
import MapView from '../components/MapView';
import IncidentPanel from '../components/IncidentPanel';
import { useNavigate } from 'react-router-dom';

export default function LiveMapPage({
  incidents = [],
  vehicles = [],
  routes = [],
  selectedIncident,
  onSelectIncident,
  selectedVehicle,
  onSelectVehicle,
  onCloseIncidentPanel
}) {
  const navigate = useNavigate();

  const [layers, setLayers] = useState({
    incidents: true,
    vehicles: true,
    routes: true,
    riskZones: true
  });

  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [sector, setSector] = useState('Sector: East Sikkim & North Bengal Corridors');
  const [tacticalMode, setTacticalMode] = useState('Standard Tactical');
  const [layerDrawerOpen, setLayerDrawerOpen] = useState(true);

  const handleToggleLayer = (layerName) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const filteredIncidents = incidents.filter(inc => {
    const matchesSeverity = severityFilter === 'ALL' || inc.severity === severityFilter;
    const matchesSearch = searchTerm === '' ||
      inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const sectorConfigs = {
    'Sector: East Sikkim & North Bengal Corridors': { center: [27.15, 88.55], zoom: 9 },
    'Sector: Western Arunachal Transit Arteries': { center: [27.5, 92.5], zoom: 8 },
    'Sector: Meghalaya Khasi Hills Corridor': { center: [25.5, 91.8], zoom: 9 },
    'Sector: Dimapur & Imphal Supply Pass': { center: [25.3, 94.0], zoom: 8 }
  };
  const activeSectorConfig = sectorConfigs[sector] || sectorConfigs['Sector: East Sikkim & North Bengal Corridors'];

  return (
    <div className="flex flex-col h-full select-none bg-background text-on-surface">
      {/* Top Operational Filter & Tactical Bar — matching Stitch live_gis_map_light */}
      <div className="flex-shrink-0 h-12 bg-white border-b border-outline-variant px-4 flex items-center justify-between gap-3 z-30 shadow-xs">
        {/* Left: Sector selector & Search */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Layer drawer toggle for mobile */}
          <button
            onClick={() => setLayerDrawerOpen(v => !v)}
            className="h-7 px-2 bg-white border border-outline-variant hover:bg-slate-50 text-on-surface rounded font-mono text-[11px] flex items-center gap-1 transition-colors shadow-xs flex-shrink-0"
            title="Toggle Map Layers"
          >
            <span className="material-symbols-outlined text-[15px] text-primary">view_sidebar</span>
            <span className="hidden md:inline font-medium">Layers</span>
          </button>

          <div className="flex min-w-0 items-center gap-1.5 bg-slate-50 border border-outline-variant px-2.5 py-1 rounded shadow-xs flex-shrink-0">
            <span className="material-symbols-outlined text-[16px] text-primary">explore</span>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="min-w-0 max-w-[210px] bg-transparent font-sans text-xs text-on-surface focus:outline-none cursor-pointer font-medium 2xl:max-w-none"
            >
              <option value="Sector: East Sikkim & North Bengal Corridors">Sector: East Sikkim & North Bengal Corridors</option>
              <option value="Sector: Western Arunachal Transit Arteries">Sector: Western Arunachal Transit Arteries</option>
              <option value="Sector: Meghalaya Khasi Hills Corridor">Sector: Meghalaya Khasi Hills Corridor</option>
              <option value="Sector: Dimapur & Imphal Supply Pass">Sector: Dimapur & Imphal Supply Pass</option>
            </select>
          </div>

        </div>

        {/* Center: Tactical Mode Presets */}
        <div className="hidden 2xl:flex items-center bg-slate-100/80 p-0.5 rounded border border-outline-variant gap-0.5">
          {[
            { label: 'Standard Tactical', icon: 'tune' },
            { label: 'Elevation Contours', icon: 'landscape' },
            { label: 'Hazard Heatmap', icon: 'local_fire_department' },
            { label: 'Convoy Tracking', icon: 'share_location' }
          ].map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setTacticalMode(label)}
              className={`px-2.5 py-1 rounded font-mono text-[11px] font-semibold flex items-center gap-1 transition-all duration-200 ${
                tacticalMode === label
                  ? 'bg-primary text-white shadow-md -translate-y-px'
                  : 'bg-white border border-outline-variant text-on-surface hover:border-primary hover:shadow-sm'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Right: Telemetry sync indicator */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-50 border border-outline-variant font-mono text-[10px] text-outline">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
            <span className="text-on-surface-variant font-medium">GIS SATELLITE SYNC</span>
            <span className="text-primary font-semibold">LIVE</span>
          </div>
        </div>
      </div>

      {/* Main Body Split (Left Layer Control Drawer + Map Canvas) */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* LEFT DRAWER: Layer Controls — collapsible, hidden on mobile by default */}
        <aside
          className={`flex-shrink-0 bg-white border-r border-outline-variant flex flex-col z-20 overflow-y-auto shadow-sm transition-all duration-300 ${
            layerDrawerOpen ? 'w-64 lg:w-72' : 'w-0 overflow-hidden border-r-0'
          }`}
        >
          <div className="w-64 lg:w-72 flex-shrink-0">
            {/* Drawer Header */}
            <div className="p-3 bg-slate-50/80 border-b border-outline-variant flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-on-surface font-semibold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-primary">layers</span>
                  <span>Tactical Map Layers</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-primary font-semibold">
                  {incidents.length + vehicles.length} Active
                </span>
              </div>

              {/* Search input */}
              <div className="relative">
                <span className="material-symbols-outlined text-[14px] text-outline absolute left-2 top-1/2 -translate-y-1/2">search</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search incidents..."
                  className="w-full bg-white border border-outline-variant rounded pl-7 pr-2 py-1.5 text-[11px] text-on-surface focus:outline-none focus:border-primary font-sans placeholder:text-outline"
                />
              </div>

              {/* Severity filter quick buttons */}
              <div className="grid grid-cols-4 gap-1 pt-1">
                <button
                  onClick={() => setSeverityFilter('ALL')}
                  className={`py-1 px-1 rounded font-mono text-[10px] text-center font-semibold border ${
                    severityFilter === 'ALL' ? 'bg-white border-primary text-primary shadow-xs' : 'bg-slate-100 border-outline-variant text-on-surface-variant'
                  }`}
                >
                  All ({incidents.length})
                </button>
                <button
                  onClick={() => setSeverityFilter('Critical')}
                  className={`py-1 px-1 rounded font-mono text-[10px] text-center font-semibold border ${
                    severityFilter === 'Critical' ? 'bg-rose-100 border-rose-300 text-error' : 'bg-rose-50 border-rose-200 text-error'
                  }`}
                >
                  Blocked
                </button>
                <button
                  onClick={() => setSeverityFilter('High')}
                  className={`py-1 px-1 rounded font-mono text-[10px] text-center font-semibold border ${
                    severityFilter === 'High' ? 'bg-amber-100 border-amber-300 text-amber-700' : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}
                >
                  At Risk
                </button>
                <button
                  onClick={() => setSeverityFilter('Medium')}
                  className={`py-1 px-1 rounded font-mono text-[10px] text-center font-medium border ${
                    severityFilter === 'Medium' ? 'bg-slate-200 border-slate-400 text-on-surface' : 'bg-slate-100 border-outline-variant text-on-surface-variant'
                  }`}
                >
                  Caution
                </button>
              </div>
            </div>

            {/* Layer Groups */}
            <div className="flex-1 p-3 flex flex-col gap-3 font-sans text-xs">
              {/* Road Layers Group */}
              <div className="bg-slate-50/70 border border-outline-variant rounded p-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-on-surface-variant font-mono text-[10px] font-semibold uppercase tracking-wider">
                  <span>Road Accessibility</span>
                  <span className="material-symbols-outlined text-[14px] text-outline">expand_less</span>
                </div>
                <label className="flex items-center justify-between p-1.5 rounded bg-white border border-slate-100 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={layers.routes}
                      onChange={() => handleToggleLayer('routes')}
                      className="accent-primary rounded w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-on-surface font-medium">National Highways (NH-10)</span>
                  </div>
                  <span className="w-3 h-1.5 rounded-full bg-emerald-600"></span>
                </label>
              </div>

              {/* Hazards Group */}
              <div className="bg-slate-50/70 border border-outline-variant rounded p-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-on-surface-variant font-mono text-[10px] font-semibold uppercase tracking-wider">
                  <span>Hazards & Obstructions</span>
                  <span className="font-mono text-[10px] text-error bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded font-bold">{incidents.filter(i => i.status === 'Active').length} LIVE</span>
                </div>
                <label className="flex items-center justify-between p-1.5 rounded bg-white border border-slate-100 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={layers.incidents}
                      onChange={() => handleToggleLayer('incidents')}
                      className="accent-error rounded w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-on-surface font-medium">Landslides & Rockfalls</span>
                  </div>
                  <span className="font-mono text-[10px] text-error bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded font-semibold">{incidents.filter(i => i.type === 'Landslide' || i.type === 'Road Damage').length}</span>
                </label>

                <label className="flex items-center justify-between p-1.5 rounded bg-white border border-slate-100 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={layers.riskZones}
                      onChange={() => handleToggleLayer('riskZones')}
                      className="accent-secondary rounded w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-on-surface font-medium">Vulnerability Circles</span>
                  </div>
                  <span className="font-mono text-[10px] text-sky-700 bg-sky-50 border border-sky-200 px-1.5 py-0.5 rounded font-semibold">{incidents.filter(i => i.severity === 'Critical' || i.severity === 'High').length}</span>
                </label>
              </div>

              {/* Fleet Telemetry */}
              <div className="bg-slate-50/70 border border-outline-variant rounded p-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-on-surface-variant font-mono text-[10px] font-semibold uppercase tracking-wider">
                  <span>Fleet & Asset Telemetry</span>
                </div>
                <label className="flex items-center justify-between p-1.5 rounded bg-white border border-slate-100 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={layers.vehicles}
                      onChange={() => handleToggleLayer('vehicles')}
                      className="accent-primary rounded w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="text-on-surface font-medium">Active Convoys</span>
                  </div>
                  <span className="font-mono text-[10px] text-primary bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded font-semibold">{vehicles.length} units</span>
                </label>
              </div>

              {/* Sector Summary Box */}
              <div className="bg-slate-100/70 border border-outline-variant p-2.5 rounded text-xs text-on-surface-variant space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-outline uppercase font-semibold">Active Sector Route Length</span>
                  <span className="text-on-surface font-semibold">{routes.reduce((sum, r) => sum + (r.distanceKm || 0), 0)} km</span>
                </div>
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-outline uppercase font-semibold">Average Travel Delta</span>
                  <span className="text-error font-semibold">+{Math.round(routes.reduce((sum, r) => sum + (r.estimatedTimeHours || 0), 0) * 60 / Math.max(routes.length, 1))} min avg</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* GIS Canvas Area */}
        <div className="relative flex-1 bg-surface-container-low overflow-hidden">
          <MapView
            height="100%"
            center={activeSectorConfig.center}
            zoom={activeSectorConfig.zoom}
            incidents={filteredIncidents}
            vehicles={vehicles}
            routes={routes}
            selectedIncident={selectedIncident}
            onSelectIncident={onSelectIncident}
            selectedVehicle={selectedVehicle}
            onSelectVehicle={onSelectVehicle}
            layers={layers}
          />

          {/* Incident Detail Panel — right side panel, inline on desktop, full overlay on mobile */}
          {selectedIncident && (
            <IncidentPanel
              incident={selectedIncident}
              onClose={onCloseIncidentPanel}
              onRerouteRoute={() => navigate('/route-intelligence')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
