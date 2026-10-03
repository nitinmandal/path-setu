import React from 'react';
import StatusBadge from './StatusBadge';

export default function IncidentPanel({ incident, onClose, onRerouteRoute }) {
  if (!incident) return null;

  return (
    /*
     * Positioned absolute within the GIS canvas container (not fixed to viewport).
     * On desktop: right-side panel, fixed width.
     * On mobile: full-width overlay within the map area.
     */
    <div className="absolute inset-y-0 right-0 z-[500] w-full sm:w-80 bg-surface-container-lowest border-l border-outline-variant shadow-xl flex flex-col overflow-y-auto">
      {/* Panel Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-outline-variant bg-slate-50">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[18px] text-error flex-shrink-0">warning</span>
          <span className="font-bold text-on-surface font-mono text-xs truncate">{incident.id}</span>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-outline hover:text-on-surface p-1 rounded hover:bg-slate-200 transition-colors"
          title="Close panel"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-on-surface">
        {/* Title & Status Badges */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-on-surface leading-snug">{incident.title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={incident.severity} />
            <StatusBadge status={incident.status} />
          </div>
        </div>

        {/* Location & Corridor */}
        <div className="bg-slate-50 rounded border border-outline-variant space-y-0 divide-y divide-outline-variant/60">
          <div className="flex items-start gap-2 p-3">
            <span className="material-symbols-outlined text-[15px] text-outline shrink-0 mt-0.5">location_on</span>
            <div>
              <span className="text-outline font-mono text-[10px] uppercase block">Location:</span>
              <p className="text-on-surface font-semibold mt-0.5">{incident.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3">
            <span className="material-symbols-outlined text-[15px] text-outline shrink-0 mt-0.5">local_shipping</span>
            <div>
              <span className="text-outline font-mono text-[10px] uppercase block">Affected Corridor:</span>
              <p className="text-primary font-semibold font-mono mt-0.5">{incident.affectedRoute}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-mono text-outline uppercase text-[10px] font-semibold mb-1.5">Operational Description</h4>
          <p className="bg-slate-50 p-3 rounded border border-outline-variant text-on-surface-variant leading-relaxed">
            {incident.description}
          </p>
        </div>

        {/* Clearance & Time */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 p-2.5 rounded border border-outline-variant">
            <span className="text-[10px] font-mono text-outline uppercase block">Est. Clearance</span>
            <span className="font-mono font-bold text-amber-700 text-xs mt-0.5 block">
              {incident.estimatedClearance || "Under Evaluation"}
            </span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded border border-outline-variant">
            <span className="text-[10px] font-mono text-outline uppercase block">Reported At</span>
            <span className="font-mono text-on-surface text-xs mt-0.5 block">
              {incident.reportedTime}
            </span>
          </div>
        </div>

        {/* Ground Units */}
        {incident.remediationTeams && incident.remediationTeams.length > 0 && (
          <div>
            <h4 className="font-mono text-outline uppercase text-[10px] font-semibold mb-1.5">Assigned Ground Units</h4>
            <ul className="space-y-1">
              {incident.remediationTeams.map((team, idx) => (
                <li
                  key={idx}
                  className="bg-slate-50 px-3 py-1.5 rounded text-on-surface text-xs flex items-center justify-between border border-outline-variant"
                >
                  <span className="text-on-surface font-medium">{team}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary flex-shrink-0"></span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons — always visible at bottom */}
      <div className="flex-shrink-0 p-4 border-t border-outline-variant bg-slate-50 space-y-2">
        <button
          onClick={() => {
            if (onRerouteRoute) onRerouteRoute(incident.affectedRoute);
          }}
          className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-2 rounded text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">alt_route</span>
          <span>Analyze Detour Options</span>
        </button>
        <button
          onClick={onClose}
          className="w-full bg-white hover:bg-slate-100 text-on-surface py-2 rounded text-xs font-semibold transition-colors border border-outline-variant"
        >
          Close Inspection Drawer
        </button>
      </div>
    </div>
  );
}
