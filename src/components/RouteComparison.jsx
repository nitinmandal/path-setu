import React from 'react';
import StatusBadge from './StatusBadge';

export default function RouteComparison({ routes = [], selectedRouteId, onSelectRoute }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {routes.map((route) => {
          const isSelected = route.id === selectedRouteId;
          const isRecommended = route.riskCategory === 'Low' || route.status?.includes('Recommended');

          return (
            <button
              type="button"
              key={route.id}
              onClick={() => onSelectRoute(route.id)}
              aria-pressed={isSelected}
              className={`w-full text-left bg-surface-container-lowest border rounded p-4 cursor-pointer transition-all flex flex-col justify-between relative shadow-xs ${
                isSelected
                  ? 'border-primary ring-1 ring-primary bg-blue-50/40'
                  : 'border-outline-variant hover:border-slate-400'
              }`}
            >
              {isRecommended && (
                <div className="absolute -top-2.5 right-3 bg-tertiary text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[12px]">verified</span>
                  <span>RECOMMENDED</span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">{route.name}</h4>
                    <p className="text-xs text-outline font-mono mt-0.5">
                      {route.origin} → {route.destination}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <StatusBadge status={route.riskCategory + " Risk"} />
                  <StatusBadge status={route.status} />
                </div>

                {/* Key Metrics Grid */}
                <div className="mt-4 grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded border border-outline-variant text-center">
                  <div>
                    <span className="text-[10px] font-mono text-outline uppercase block font-semibold">Distance</span>
                    <span className="font-mono font-bold text-on-surface text-xs">{route.distanceKm} km</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-outline uppercase block font-semibold">Est. Time</span>
                    <span className="font-mono font-bold text-on-surface text-xs">{route.estimatedTimeHours} hrs</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-outline uppercase block font-semibold">Risk Score</span>
                    <span className="font-mono font-bold text-amber-700 text-xs">{route.baseRiskScore} / 100</span>
                  </div>
                </div>

                {/* Primary Hazards */}
                {route.primaryHazards && route.primaryHazards.length > 0 && (
                  <div className="mt-3">
                    <span className="text-[10px] font-mono text-outline block font-semibold mb-1 uppercase">Key Risk Factors:</span>
                    <ul className="space-y-1">
                      {route.primaryHazards.map((h, i) => (
                        <li key={i} className="text-[11px] text-on-surface-variant flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-[14px] text-amber-600 shrink-0 mt-0.5">warning</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-outline-variant flex items-center justify-between text-xs">
                <span className="text-outline font-mono">{isSelected ? 'Selected Corridor' : 'Click to Inspect'}</span>
                <div className={`p-1 rounded-full ${isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-outline'}`}>
                  <span className="material-symbols-outlined text-[16px]">
                    {isSelected ? 'check' : 'arrow_forward'}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
