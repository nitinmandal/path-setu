import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

import MapView from '../components/MapView';
import StatusBadge from '../components/StatusBadge';

export default function DashboardPage({ incidents, vehicles, routes, alerts, shipments, districts = [], onSelectIncident }) {
  // Derive incident trend from actual incident types
  const incidentTrendData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const landslideCount = incidents.filter(i => i.type === 'Landslide' || i.type === 'Road Damage').length;
    const floodCount = incidents.filter(i => i.type === 'Flood' || i.type === 'Heavy Rainfall').length;
    const trafficCount = incidents.filter(i => i.type === 'Traffic' || i.type === 'Accident' || i.type === 'Bridge Damage').length;
    // Spread real counts across the week for visual effect with variation
    return days.map((day, idx) => ({
      day,
      Landslides: Math.max(0, Math.round(landslideCount * (0.4 + Math.sin(idx * 1.2) * 0.6))),
      Floods: Math.max(0, Math.round(floodCount * (0.3 + Math.cos(idx * 0.9) * 0.7))),
      Traffic: Math.max(0, Math.round(trafficCount * (0.5 + Math.sin(idx * 0.7 + 1) * 0.5)))
    }));
  }, [incidents]);

  // Derive shipment delay data from actual shipments
  const shipmentDelayData = useMemo(() => {
    const corridors = {};
    shipments.forEach(shp => {
      const key = `${shp.origin.split(' ')[0]}–${shp.destination.split(' ')[0]}`;
      if (!corridors[key]) corridors[key] = { corridor: key, OnTime: 0, Delayed: 0 };
      if (shp.status === 'Delayed' || (shp.delayMinutes && shp.delayMinutes > 60)) {
        corridors[key].Delayed += 1;
      } else {
        corridors[key].OnTime += 1;
      }
    });
    return Object.values(corridors);
  }, [shipments]);

  // Route risk distribution data
  const routeRiskData = useMemo(() => {
    const counts = { Low: 0, Moderate: 0, High: 0, Critical: 0 };
    routes.forEach(r => { if (counts[r.riskCategory] !== undefined) counts[r.riskCategory]++; });
    return Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name: `${name} Risk`, value }));
  }, [routes]);

  const RISK_COLORS = { 'Low Risk': '#16a34a', 'Moderate Risk': '#d97706', 'High Risk': '#ea580c', 'Critical Risk': '#dc2626' };
  const activeIncidentsCount = incidents.filter(i => i.status === 'Active').length;
  const criticalIncidentsCount = incidents.filter(i => i.status === 'Active' && i.severity === 'Critical').length;
  const highRiskRoutesCount = routes.filter(r => r.riskCategory === 'High' || r.riskCategory === 'Critical').length;
  const totalShipments = shipments.length;
  const delayedShipments = shipments.filter(shipment => shipment.status === 'Delayed').length;
  const movingShipments = shipments.filter(shipment => shipment.status === 'In Transit' || shipment.status === 'On Schedule').length;
  
  // Calculate aggregate regional connectivity from districts
  const avgConnectivity = districts.length > 0 
    ? Math.round(districts.reduce((sum, d) => sum + (d.connectivityScore || 0), 0) / districts.length)
    : 100;
  
  const totalOpenRoads = districts.reduce((sum, d) => sum + (d.openRoadsKm || 0), 0);
  const totalRoads = districts.reduce((sum, d) => sum + (d.totalRoadsKm || 0), 0);

  return (
    <div className="space-y-5 pb-10">
      {/* Top Banner / Title Bar */}
      <div className="page-header">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-on-surface tracking-tight font-sans">Operations Control Dashboard</h1>
            <span className="font-mono text-[10px] bg-blue-50 text-primary border border-blue-200 px-2 py-0.5 rounded font-semibold uppercase">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5 font-sans">
            A shared view of route conditions, active hazards, and fleet movement.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/route-intelligence"
            className="bg-primary hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">alt_route</span>
            <span>Analyze Route Risk</span>
          </Link>
        </div>
      </div>

      {/* KPI Ribbon matching Stitch layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded flex flex-col justify-between shadow-xs hover:shadow-md hover:border-outline transition-all duration-300 group">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] font-semibold text-outline uppercase tracking-wider">Regional Connectivity</span>
              <h3 className="text-2xl font-bold text-on-surface mt-1 font-mono">{avgConnectivity}%</h3>
            </div>
            <div className={`w-8 h-8 rounded flex items-center justify-center ${avgConnectivity > 80 ? 'bg-emerald-50 border border-emerald-200 text-tertiary' : 'bg-amber-50 border border-amber-200 text-amber-600'}`}>
              <span className="material-symbols-outlined text-[18px]">{avgConnectivity > 80 ? 'check_circle' : 'warning'}</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-outline-variant/60 flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>{totalOpenRoads} / {totalRoads} km open</span>
            <span className="text-tertiary font-bold">LIVE</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded flex flex-col justify-between shadow-xs hover:shadow-md hover:border-outline transition-all duration-300 group">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] font-semibold text-outline uppercase tracking-wider">Active Hazards</span>
              <h3 className="text-2xl font-bold text-error mt-1 font-mono">{activeIncidentsCount}</h3>
            </div>
            <div className="w-8 h-8 rounded bg-rose-50 border border-rose-200 text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-outline-variant/60 flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>{criticalIncidentsCount} critical blockage{criticalIncidentsCount === 1 ? '' : 's'}</span>
            <span className="text-error font-bold">ACTIVE</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded flex flex-col justify-between shadow-xs hover:shadow-md hover:border-outline transition-all duration-300 group">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] font-semibold text-outline uppercase tracking-wider">At-Risk Corridors</span>
              <h3 className="text-2xl font-bold text-amber-600 mt-1 font-mono">{highRiskRoutesCount}</h3>
            </div>
            <div className="w-8 h-8 rounded bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">explore</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-outline-variant/60 flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>Review before dispatch</span>
            <span className="text-amber-600 font-bold">CHECK</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded flex flex-col justify-between shadow-xs hover:shadow-md hover:border-outline transition-all duration-300 group">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] font-semibold text-outline uppercase tracking-wider">Logistics Convoys</span>
              <h3 className="text-2xl font-bold text-primary mt-1 font-mono">{movingShipments} / {totalShipments}</h3>
            </div>
            <div className="w-8 h-8 rounded bg-blue-50 border border-blue-200 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-outline-variant/60 flex items-center justify-between text-xs text-on-surface-variant font-mono">
            <span>{delayedShipments} shipment{delayedShipments === 1 ? '' : 's'} delayed</span>
            <span className="text-primary font-bold">DEMO</span>
          </div>
        </div>
      </div>

      {/* Main Regional GIS Map Overview */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">public</span>
            <h3 className="font-bold text-on-surface text-sm font-sans">Regional Tactical GIS Situation Map</h3>
          </div>
          <Link
            to="/map"
            className="text-xs font-mono text-primary hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Open Full GIS Canvas</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>

        <MapView
          height="380px"
          incidents={incidents}
          vehicles={vehicles}
          routes={routes}
          onSelectIncident={onSelectIncident}
        />
      </div>

      {/* Analytics Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 space-y-3 shadow-xs hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-on-surface text-xs font-mono uppercase tracking-wider">
              7-Day Incident Frequency Trend
            </h3>
            <span className="text-[10px] text-outline font-mono">Demo data</span>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incidentTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="Landslides" stackId="1" stroke="#dc2626" fill="#fee2e2" fillOpacity={0.8} />
                <Area type="monotone" dataKey="Floods" stackId="1" stroke="#2563eb" fill="#dbe1ff" fillOpacity={0.8} />
                <Area type="monotone" dataKey="Traffic" stackId="1" stroke="#d97706" fill="#fef3c7" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 space-y-3 shadow-xs hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-on-surface text-xs font-mono uppercase tracking-wider">
              Corridor Freight Transit Performance
            </h3>
            <span className="text-[10px] text-outline font-mono">Demo data</span>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shipmentDelayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="corridor" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                />
                <Bar dataKey="OnTime" fill="#16a34a" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Delayed" fill="#f97316" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 space-y-3 shadow-xs hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-on-surface text-xs font-mono uppercase tracking-wider">
              Route Risk Distribution
            </h3>
            <span className="text-[10px] text-outline font-mono">{routes.length} corridors</span>
          </div>
          <div className="h-64 w-full pt-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={routeRiskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                  style={{ fontSize: '11px', fontFamily: 'monospace' }}
                >
                  {routeRiskData.map((entry) => (
                    <Cell key={entry.name} fill={RISK_COLORS[entry.name] || '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '4px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Incidents & Alerts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 space-y-3 shadow-xs hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between border-b border-outline-variant pb-2">
            <h3 className="font-bold text-on-surface text-sm font-sans">Active Hazard Briefing</h3>
            <Link to="/incidents" className="text-xs font-mono text-primary hover:underline">
              View Registry ({incidents.length})
            </Link>
          </div>

          <div className="space-y-2">
            {incidents.slice(0, 4).map((inc) => (
              <div
                key={inc.id}
                onClick={() => onSelectIncident(inc)}
                className="bg-slate-50/70 p-3 rounded border border-outline-variant hover:border-primary cursor-pointer transition-colors flex items-start justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-on-surface">{inc.id}</span>
                    <StatusBadge status={inc.severity} />
                  </div>
                  <h4 className="text-xs font-bold text-on-surface mt-1">{inc.title}</h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">{inc.location}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-outline block">{inc.reportedTime}</span>
                  <span className="text-[10px] font-mono text-amber-700 block mt-1">Est: {inc.estimatedClearance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 space-y-3 shadow-xs hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between border-b border-outline-variant pb-2">
            <h3 className="font-bold text-on-surface text-sm font-sans">Critical Bulletins</h3>
            <Link to="/alerts" className="text-xs font-mono text-primary hover:underline">
              Alert Center
            </Link>
          </div>

          <div className="space-y-2">
            {alerts.slice(0, 4).map((alt) => (
              <div key={alt.id} className="bg-slate-50/70 p-3 rounded border border-outline-variant space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface">{alt.title}</span>
                  <span className="text-[10px] font-mono text-outline">{alt.timestamp}</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-snug">{alt.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
