import React from 'react';

export default function StatusBadge({ status }) {
  if (!status) return null;

  const s = String(status).toLowerCase();
  
  let colorClasses = "bg-slate-100 text-on-surface-variant border-outline-variant";

  if (s.includes('critical') || s.includes('high risk') || s.includes('blocked')) {
    colorClasses = "bg-rose-50 text-error border-rose-200";
  } else if (s.includes('high') || s.includes('delayed') || s.includes('disrupted')) {
    colorClasses = "bg-orange-50 text-orange-700 border-orange-200";
  } else if (s.includes('moderate') || s.includes('medium') || s.includes('caution') || s.includes('rerouted') || s.includes('monitoring')) {
    colorClasses = "bg-amber-50 text-amber-700 border-amber-200";
  } else if (s.includes('low') || s.includes('operational') || s.includes('recommended') || s.includes('on schedule') || s.includes('resolved') || s.includes('accessible')) {
    colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (s.includes('active') || s.includes('in motion') || s.includes('in transit')) {
    colorClasses = "bg-blue-50 text-primary border-blue-200";
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px] font-semibold border ${colorClasses}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>
      {status}
    </span>
  );
}
