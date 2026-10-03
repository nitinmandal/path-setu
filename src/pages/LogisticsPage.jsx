import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import FilterBar from '../components/FilterBar';

export default function LogisticsPage({ shipments = [], vehicles = [], onStartSimulation, onStopSimulation }) {
  const [activeTab, setActiveTab] = useState('shipments');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleToggleSimulation = () => {
    if (isSimulating) {
      if (onStopSimulation) onStopSimulation();
    } else {
      if (onStartSimulation) onStartSimulation();
    }
    setIsSimulating(!isSimulating);
  };

  const filteredShipments = shipments.filter(shp =>
    shp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shp.cargoType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shp.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shp.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVehicles = vehicles.filter(v =>
    v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.locationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shipmentColumns = [
    {
      header: "Shipment ID",
      accessor: (r) => <span className="font-mono font-bold text-on-surface">{r.id}</span>
    },
    {
      header: "Vehicle ID",
      accessor: (r) => <span className="font-mono text-primary font-medium">{r.vehicleId}</span>
    },
    {
      header: "Cargo Type",
      accessor: (r) => <span className="text-on-surface-variant font-medium">{r.cargoType}</span>
    },
    {
      header: "Origin → Destination",
      accessor: (r) => (
        <span className="font-mono text-on-surface">
          {r.origin} → {r.destination}
        </span>
      )
    },
    {
      header: "EST. Arrival (ETA)",
      accessor: (r) => <span className="font-mono text-outline">{r.eta}</span>
    },
    {
      header: "Corridor Risk",
      accessor: (r) => <StatusBadge status={r.riskLevel + " Risk"} />
    },
    {
      header: "Status",
      accessor: (r) => <StatusBadge status={r.status} />
    }
  ];

  const vehicleColumns = [
    {
      header: "Vehicle ID",
      accessor: (r) => <span className="font-mono font-bold text-on-surface">{r.id}</span>
    },
    {
      header: "Vehicle Type",
      accessor: (r) => <span className="text-on-surface">{r.type}</span>
    },
    {
      header: "Assigned Driver",
      accessor: (r) => <span className="text-on-surface-variant">{r.driver}</span>
    },
    {
      header: "Current Location",
      accessor: (r) => <span className="font-mono text-amber-700 font-semibold">{r.locationName}</span>
    },
    {
      header: "Destination",
      accessor: (r) => <span className="text-on-surface">{r.destination}</span>
    },
    {
      header: "Speed",
      accessor: (r) => <span className="font-mono text-tertiary font-bold">{r.speed} km/h</span>
    },
    {
      header: "Status",
      accessor: (r) => <StatusBadge status={r.status} />
    }
  ];

  return (
    <div className="space-y-5 pb-10">
      {/* Title Header */}
      <div className="page-header">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-on-surface tracking-tight font-sans">Logistics & Freight Fleet Monitoring</h1>
            <span className="font-mono text-[10px] bg-blue-50 text-primary border border-blue-200 px-2 py-0.5 rounded font-semibold uppercase">
              TELEMETRY STREAM
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5 font-sans">
            Simulated Supply Convoy Tracking, Staging Depot Telemetry & Freight Payload Status
          </p>
        </div>

        <button
          onClick={handleToggleSimulation}
          className={`text-xs font-semibold px-4 py-2 rounded transition-colors flex items-center gap-2 shadow-xs ${
            isSimulating
              ? 'bg-amber-600 hover:bg-amber-700 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {isSimulating ? 'pause' : 'play_arrow'}
          </span>
          <span>{isSimulating ? 'Pause Convoy Telemetry' : 'Simulate Convoy Movement'}</span>
        </button>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-outline-variant pb-2">
        <button
          onClick={() => setActiveTab('shipments')}
          className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold transition-colors ${
            activeTab === 'shipments'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">package</span>
          <span>Active Shipments ({shipments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vehicles')}
          className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold transition-colors ${
            activeTab === 'vehicles'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">local_shipping</span>
          <span>Fleet Convoys ({vehicles.length})</span>
        </button>
      </div>

      {/* Search & Filter */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder={`Search ${activeTab}...`}
      />

      {/* Data Table */}
      {activeTab === 'shipments' ? (
        <DataTable columns={shipmentColumns} data={filteredShipments} />
      ) : (
        <DataTable columns={vehicleColumns} data={filteredVehicles} />
      )}
    </div>
  );
}
