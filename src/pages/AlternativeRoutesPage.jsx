import React, { useState } from 'react';
import RouteComparison from '../components/RouteComparison';
import MapView from '../components/MapView';
import { useNavigate } from 'react-router-dom';

export default function AlternativeRoutesPage({ routes = [], incidents = [], vehicles = [] }) {
  const navigate = useNavigate();
  const [selectedRouteId, setSelectedRouteId] = useState(routes[1]?.id || routes[0]?.id);

  const activeRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  return (
    <div className="space-y-5 pb-10">
      {/* Page Title Header */}
      <div className="page-header">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-on-surface tracking-tight font-sans">Alternative Routes & Detour Intelligence</h1>
            <span className="font-mono text-[10px] bg-blue-50 text-primary border border-blue-200 px-2 py-0.5 rounded font-semibold uppercase">
              {routes.length} OPTIONS
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5 font-sans">
            Side-by-Side Comparison of 3 Corridor Alternatives for Emergency Rerouting
          </p>
        </div>
        <button
          onClick={() => navigate('/logistics')}
          className="bg-primary hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">local_shipping</span>
          <span>Assign Rerouted Convoy</span>
        </button>
      </div>

      {/* Structured Route Cards Comparison */}
      <RouteComparison
        routes={routes}
        selectedRouteId={selectedRouteId}
        onSelectRoute={(id) => setSelectedRouteId(id)}
      />

      {/* Comparison Matrix Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-outline-variant pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">compare_arrows</span>
            <h3 className="font-bold text-on-surface text-sm font-sans">Detailed Corridor Comparison Matrix</h3>
          </div>
          <span className="text-xs font-mono text-outline">{routes.length > 0 ? `${routes[0].origin} ↔ ${routes[0].destination} Corridor` : 'All Corridors'}</span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs text-on-surface">
            <thead className="bg-slate-50 font-mono text-[11px] text-outline uppercase tracking-wider border-b border-outline-variant">
              <tr>
                <th className="px-4 py-3">Corridor Name</th>
                <th className="px-4 py-3">Distance</th>
                <th className="px-4 py-3">Baseline ETA</th>
                <th className="px-4 py-3">Risk Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-sans">
              {routes.map((r) => (
                <tr
                  key={r.id}
                  className={`hover:bg-slate-50/80 ${r.id === selectedRouteId ? 'bg-blue-50/60' : ''}`}
                >
                  <td className="px-4 py-3 font-semibold text-on-surface">{r.name}</td>
                  <td className="px-4 py-3 font-mono text-on-surface">{r.distanceKm} km</td>
                  <td className="px-4 py-3 font-mono text-on-surface">{r.estimatedTimeHours} hrs</td>
                  <td className="px-4 py-3 font-mono font-bold text-amber-700">{r.baseRiskScore} / 100</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      r.riskCategory === 'High' ? 'bg-rose-50 border border-rose-200 text-error font-semibold' :
                      r.riskCategory === 'Moderate' ? 'bg-amber-50 border border-amber-200 text-amber-700 font-semibold' : 'bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">{r.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Route Trajectory GIS View */}
      {activeRoute && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-on-surface text-xs font-mono uppercase tracking-wider">
              Selected Detour GIS Trajectory Preview ({activeRoute.name})
            </h3>
            <span className="text-xs font-mono text-tertiary font-semibold">
              {activeRoute.distanceKm} km • {activeRoute.estimatedTimeHours} hrs
            </span>
          </div>
          <MapView
            height="320px"
            incidents={incidents}
            routes={[activeRoute]}
            vehicles={vehicles}
          />
        </div>
      )}
    </div>
  );
}
