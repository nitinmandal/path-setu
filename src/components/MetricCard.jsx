import React from 'react';

/**
 * MetricCard — Stitch Light Ops Theme
 * Matches the KPI cards in operations_dashboard_light/code.html
 */
export default function MetricCard({ title, value, subtext, icon, iconName, statusColor = "blue", trend }) {
  const iconColorMap = {
    blue: "text-primary bg-blue-50 border-blue-200",
    emerald: "text-tertiary bg-emerald-50 border-emerald-200",
    amber: "text-amber-700 bg-amber-50 border-amber-200",
    red: "text-error bg-rose-50 border-rose-200"
  };

  const iconClass = iconColorMap[statusColor] || iconColorMap.blue;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded flex flex-col justify-between shadow-xs">
      <div className="flex items-start justify-between">
        <div>
          <span className="font-mono text-[10px] font-semibold text-outline uppercase tracking-wider">{title}</span>
          <h3 className="text-2xl font-bold text-on-surface mt-1 font-mono">{value}</h3>
        </div>
        {(iconName || icon) && (
          <div className={`w-8 h-8 rounded border flex items-center justify-center ${iconClass}`}>
            {iconName ? (
              <span className="material-symbols-outlined text-[18px]">{iconName}</span>
            ) : icon ? (
              React.createElement(icon, { className: "w-5 h-5" })
            ) : null}
          </div>
        )}
      </div>
      {subtext && (
        <div className="mt-3 pt-2 border-t border-outline-variant/60 flex items-center justify-between text-xs text-on-surface-variant font-mono">
          <span>{subtext}</span>
          {trend && (
            <span className={`font-mono font-semibold ${trend.startsWith('+') ? 'text-amber-700' : 'text-tertiary'}`}>
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
