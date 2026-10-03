import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateRouteRisk } from '../utils/riskCalculator';
import RiskScore from '../components/RiskScore';
import StatusBadge from '../components/StatusBadge';
import MapView from '../components/MapView';

export default function RouteIntelligencePage({ routes = [], incidents = [], vehicles = [] }) {
  const navigate = useNavigate();

  const [origin, setOrigin] = useState('Siliguri');
  const [destination, setDestination] = useState('Gangtok');
  const [vehicleType, setVehicleType] = useState('Heavy Freight Truck');
  const [cargoType, setCargoType] = useState('Food Grains & Supplies');

  const [analyzedRoute, setAnalyzedRoute] = useState(routes[0] || null);
  const [riskData, setRiskData] = useState(() =>
    calculateRouteRisk({
      weatherRisk: 22,
      roadConditionRisk: 24,
      incidentExposure: 20,
      trafficRisk: 12,
      vehicleType: 'Heavy Freight Truck',
      cargoType: 'Food Grains & Supplies'
    })
  );

  const handleAnalyze = (e) => {
    e.preventDefault();
    const matched = routes.find(
      r => r.origin.toLowerCase().includes(origin.toLowerCase()) &&
           r.destination.toLowerCase().includes(destination.toLowerCase())
    ) || routes[0];

    setAnalyzedRoute(matched);

    const calculated = calculateRouteRisk({
      weatherRisk: matched.weatherRisk || 15,
      roadConditionRisk: matched.roadConditionRisk || 15,
      incidentExposure: matched.incidentExposure || 15,
      trafficRisk: matched.trafficRisk || 10,
      vehicleType,
      cargoType
    });

    setRiskData(calculated);
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Top Title Banner */}
      <div className="page-header">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-on-surface tracking-tight font-sans">Route Intelligence & Hazard Risk Evaluation</h1>
            <span className="font-mono text-[10px] bg-blue-50 text-primary border border-blue-200 px-2 py-0.5 rounded font-semibold uppercase">
              TACTICAL ENGINE
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5 font-sans">
            Transparent Rules-Based Multi-Factor Transit Risk Model & Detour Evaluation
          </p>
        </div>
        <button
          onClick={() => navigate('/alternative-routes')}
          className="bg-white hover:bg-slate-50 text-on-surface border border-outline-variant text-xs font-semibold px-3.5 py-2 rounded transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px] text-primary">compare_arrows</span>
          <span>Compare Alternative Routes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Form Specification matching Stitch */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-outline-variant">
            <span className="material-symbols-outlined text-[20px] text-primary">alt_route</span>
            <h3 className="font-bold text-on-surface text-sm font-sans">Trip Specification Parameters</h3>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-3.5 text-xs text-on-surface">
            <div>
              <label className="block font-mono text-[11px] text-outline font-semibold uppercase mb-1">Origin Node</label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-50 border border-outline-variant rounded px-3 py-2 text-on-surface focus:outline-none focus:border-primary font-sans"
              >
                <option value="Siliguri">Siliguri Transit Hub</option>
                <option value="Guwahati">Guwahati Inland Freight Terminal</option>
                <option value="Dimapur">Dimapur Railhead Depot</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-outline font-semibold uppercase mb-1">Destination Node</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-50 border border-outline-variant rounded px-3 py-2 text-on-surface focus:outline-none focus:border-primary font-sans"
              >
                <option value="Gangtok">Gangtok Central Distribution</option>
                <option value="Shillong">Shillong Emergency Reserve</option>
                <option value="Imphal">Imphal Regional Logistics Unit</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-outline font-semibold uppercase mb-1">Vehicle Classification</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full bg-slate-50 border border-outline-variant rounded px-3 py-2 text-on-surface focus:outline-none focus:border-primary font-sans"
              >
                <option value="Light Convoy Truck">Light Convoy Truck (2-Axle)</option>
                <option value="Heavy Freight Truck">Heavy Freight Truck (3+ Axle)</option>
                <option value="Emergency Medical Unit">Emergency Medical Unit (Rapid Transit)</option>
                <option value="Fuel Tanker">Fuel Tanker (Hazardous Material)</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-outline font-semibold uppercase mb-1">Cargo Payload Category</label>
              <select
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value)}
                className="w-full bg-slate-50 border border-outline-variant rounded px-3 py-2 text-on-surface focus:outline-none focus:border-primary font-sans"
              >
                <option value="Food Grains & Supplies">Food Grains & Essential Supplies</option>
                <option value="Vaccines & Critical Medical Supplies">Vaccines & Critical Medical Supplies</option>
                <option value="Telecom Infrastructure Units">Telecom & Emergency Hardware</option>
                <option value="Diesel & POL Products">Diesel & POL Products</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-2.5 rounded text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">calculate</span>
              <span>Calculate Route Risk</span>
            </button>
          </form>
        </div>

        {/* Right Column: Calculated Results & Map */}
        <div className="lg:col-span-2 space-y-5">
          {analyzedRoute && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded p-5 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline-variant">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-on-surface text-base">{analyzedRoute.name}</h3>
                    <StatusBadge status={riskData.category + " Risk"} />
                  </div>
                  <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                    Primary Corridor • {analyzedRoute.origin} → {analyzedRoute.destination}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-outline block">Total Distance</span>
                  <span className="text-lg font-bold font-mono text-on-surface">{analyzedRoute.distanceKm} km</span>
                </div>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded border border-outline-variant">
                <div>
                  <span className="text-[10px] font-mono text-outline uppercase block">Est. Transit Time</span>
                  <span className="text-sm font-bold font-mono text-on-surface">{analyzedRoute.estimatedTimeHours} Hours</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-outline uppercase block">Road Condition</span>
                  <span className={`text-sm font-bold font-mono ${(analyzedRoute.roadConditionRisk || 0) > 18 ? 'text-error' : (analyzedRoute.roadConditionRisk || 0) > 12 ? 'text-amber-700' : 'text-tertiary'}`}>
                    {(analyzedRoute.roadConditionRisk || 0) > 18 ? 'Poor / Damaged' : (analyzedRoute.roadConditionRisk || 0) > 12 ? 'Single Lane / Slip' : 'Good Condition'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-outline uppercase block">Weather Hazard</span>
                  <span className={`text-sm font-bold font-mono ${(analyzedRoute.weatherRisk || 0) > 18 ? 'text-error' : (analyzedRoute.weatherRisk || 0) > 10 ? 'text-amber-700' : 'text-on-surface'}`}>
                    {(analyzedRoute.weatherRisk || 0) > 18 ? 'Severe Storm / Cloudburst' : (analyzedRoute.weatherRisk || 0) > 10 ? 'Heavy Mist / Rain' : 'Clear / Light'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-outline uppercase block">Incident Exposure</span>
                  <span className={`text-sm font-bold font-mono ${(analyzedRoute.incidentExposure || 0) > 15 ? 'text-error' : (analyzedRoute.incidentExposure || 0) > 8 ? 'text-amber-700' : 'text-tertiary'}`}>
                    {(() => { const count = incidents.filter(i => i.status === 'Active' && i.affectedRoute?.includes(analyzedRoute.origin)).length; return count > 0 ? `${count} Active Hazard${count > 1 ? 's' : ''}` : 'No Active Incidents'; })()}
                  </span>
                </div>
              </div>

              {/* Risk Model Breakdown */}
              <RiskScore riskData={riskData} />

              {/* GIS Map Trajectory */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-outline uppercase tracking-wider block font-semibold">
                  Corridor GIS Trajectory & Active Incidents
                </span>
                <MapView
                  height="260px"
                  incidents={incidents}
                  routes={[analyzedRoute]}
                  vehicles={vehicles}
                />
              </div>

              {/* Action */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => navigate('/alternative-routes')}
                  className="bg-primary hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors flex items-center gap-2 shadow-xs"
                >
                  <span>Compare Detour Alternatives</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
