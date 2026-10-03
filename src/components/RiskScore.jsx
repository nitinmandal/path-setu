import React from 'react';
import StatusBadge from './StatusBadge';

export default function RiskScore({ riskData }) {
  if (!riskData) return null;

  const { score, category, breakdown, formulaText } = riskData;

  const getBarColor = (val) => {
    if (val > 20) return 'bg-error';
    if (val > 12) return 'bg-amber-500';
    return 'bg-tertiary';
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 space-y-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
        <div>
          <span className="text-[10px] font-mono text-outline uppercase font-semibold">Computed Route Risk Score</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-3xl font-bold font-mono text-on-surface">{score}</span>
            <span className="text-xs text-outline font-mono">/ 100</span>
          </div>
        </div>
        <StatusBadge status={category} />
      </div>

      {/* Formula Explanation Note */}
      <div className="bg-slate-50 p-2.5 rounded border border-outline-variant text-[11px] font-mono text-on-surface-variant leading-relaxed">
        <span className="text-primary font-bold uppercase block mb-1">Transparent Formula Model:</span>
        {formulaText || `Risk Score = Weather Risk + Road Condition Risk + Incident Risk + Traffic Risk`}
      </div>

      {/* Component Breakdown Progress Bars */}
      {breakdown && (
        <div className="space-y-2.5 text-xs">
          <div>
            <div className="flex justify-between text-outline font-mono mb-1 text-[11px]">
              <span>Weather Risk Factor</span>
              <span className="text-on-surface font-semibold">{breakdown.weather} / 25</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getBarColor(breakdown.weather)} transition-all duration-500`}
                style={{ width: `${Math.min(100, (breakdown.weather / 25) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-outline font-mono mb-1 text-[11px]">
              <span>Road Condition Risk</span>
              <span className="text-on-surface font-semibold">{breakdown.roadCondition} / 25</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getBarColor(breakdown.roadCondition)} transition-all duration-500`}
                style={{ width: `${Math.min(100, (breakdown.roadCondition / 25) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-outline font-mono mb-1 text-[11px]">
              <span>Incident Exposure</span>
              <span className="text-on-surface font-semibold">{breakdown.incidentExposure} / 25</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getBarColor(breakdown.incidentExposure)} transition-all duration-500`}
                style={{ width: `${Math.min(100, (breakdown.incidentExposure / 25) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-outline font-mono mb-1 text-[11px]">
              <span>Traffic Bottleneck Risk</span>
              <span className="text-on-surface font-semibold">{breakdown.traffic} / 25</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getBarColor(breakdown.traffic)} transition-all duration-500`}
                style={{ width: `${Math.min(100, (breakdown.traffic / 25) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
