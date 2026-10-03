import React from 'react';

/**
 * MapLayerControl — Stitch Light Theme
 * Note: This component is available for use but layer controls
 * are currently embedded directly in LiveMapPage's left drawer.
 */
export default function MapLayerControl({ layers, onToggleLayer }) {
  return (
    <div className="bg-white border border-outline-variant rounded p-3 text-xs text-on-surface space-y-2 shadow-md">
      <div className="flex items-center gap-1.5 font-mono font-semibold text-on-surface uppercase text-[11px] mb-1">
        <span className="material-symbols-outlined text-[16px] text-primary">layers</span>
        <span>GIS Layer Controls</span>
      </div>

      <div className="space-y-1.5">
        <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 px-1.5 py-1 rounded transition-colors">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error"></span>
            <span className="text-on-surface">Incidents & Hazards</span>
          </span>
          <input
            type="checkbox"
            checked={layers.incidents}
            onChange={() => onToggleLayer('incidents')}
            className="accent-primary w-3.5 h-3.5 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 px-1.5 py-1 rounded transition-colors">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-on-surface">Fleet Convoy Vehicles</span>
          </span>
          <input
            type="checkbox"
            checked={layers.vehicles}
            onChange={() => onToggleLayer('vehicles')}
            className="accent-primary w-3.5 h-3.5 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 px-1.5 py-1 rounded transition-colors">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            <span className="text-on-surface">Route Lines & Detours</span>
          </span>
          <input
            type="checkbox"
            checked={layers.routes}
            onChange={() => onToggleLayer('routes')}
            className="accent-primary w-3.5 h-3.5 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 px-1.5 py-1 rounded transition-colors">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-on-surface">Risk Vulnerability Circles</span>
          </span>
          <input
            type="checkbox"
            checked={layers.riskZones}
            onChange={() => onToggleLayer('riskZones')}
            className="accent-primary w-3.5 h-3.5 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
}
