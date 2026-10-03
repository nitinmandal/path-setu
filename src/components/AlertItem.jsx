import React from 'react';
import StatusBadge from './StatusBadge';

export default function AlertItem({ alert, onAcknowledge }) {
  const getIcon = () => {
    switch (alert.category) {
      case 'Critical':
        return <span className="material-symbols-outlined text-[20px] text-error shrink-0">error</span>;
      case 'Warning':
        return <span className="material-symbols-outlined text-[20px] text-amber-600 shrink-0">warning</span>;
      default:
        return <span className="material-symbols-outlined text-[20px] text-primary shrink-0">info</span>;
    }
  };

  const getBorderColor = () => {
    switch (alert.category) {
      case 'Critical':
        return 'border-l-4 border-l-error border-outline-variant';
      case 'Warning':
        return 'border-l-4 border-l-amber-500 border-outline-variant';
      default:
        return 'border-l-4 border-l-primary border-outline-variant';
    }
  };

  return (
    <div className={`bg-surface-container-lowest border rounded p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 transition-colors shadow-xs ${getBorderColor()}`}>
      <div className="flex items-start gap-3 min-w-0">
        {getIcon()}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-bold text-on-surface text-sm">{alert.title}</h4>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 border border-outline-variant text-outline">
              {alert.timestamp}
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{alert.message}</p>
          {alert.affectedRoute && (
            <span className="inline-block mt-2 text-[10px] font-mono text-primary bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-semibold">
              Corridor: {alert.affectedRoute}
            </span>
          )}
        </div>
      </div>

      <div className="self-end sm:self-auto shrink-0">
        {alert.acknowledged ? (
          <span className="text-[11px] font-mono text-tertiary flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            <span>ACK</span>
          </span>
        ) : (
          <button
            onClick={() => onAcknowledge && onAcknowledge(alert.id)}
            className="text-xs font-mono bg-white border border-outline-variant hover:border-primary text-on-surface px-2.5 py-1 rounded transition-colors shadow-xs font-medium"
          >
            ACK
          </button>
        )}
      </div>
    </div>
  );
}
