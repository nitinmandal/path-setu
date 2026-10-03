import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import StatusBadge from '../components/StatusBadge';
import IncidentPanel from '../components/IncidentPanel';
import NewIncidentModal from '../components/NewIncidentModal';

export default function IncidentsPage({
  incidents = [],
  onAddIncident,
  selectedIncident,
  onSelectIncident,
  onCloseIncidentPanel
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = incidents.filter(inc => {
    const matchesSeverity = filterSeverity === 'ALL' || inc.severity === filterSeverity;
    const matchesSearch = searchTerm === '' ||
      inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const columns = [
    {
      header: "Incident ID",
      accessor: (row) => <span className="font-mono font-bold text-on-surface">{row.id}</span>
    },
    {
      header: "Type",
      accessor: (row) => <span className="font-semibold text-on-surface-variant">{row.type}</span>
    },
    {
      header: "Title & Location",
      accessor: (row) => (
        <div>
          <div className="font-bold text-on-surface">{row.title}</div>
          <div className="text-[11px] text-outline">{row.location}</div>
        </div>
      )
    },
    {
      header: "Affected Route",
      accessor: (row) => <span className="font-mono text-primary font-medium">{row.affectedRoute}</span>
    },
    {
      header: "Severity",
      accessor: (row) => <StatusBadge status={row.severity} />
    },
    {
      header: "Status",
      accessor: (row) => <StatusBadge status={row.status} />
    },
    {
      header: "Reported Time",
      accessor: (row) => <span className="font-mono text-outline">{row.reportedTime}</span>
    },
    {
      header: "Action",
      accessor: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectIncident(row);
          }}
          className="bg-white border border-outline-variant hover:border-primary text-on-surface px-2.5 py-1 rounded text-[11px] font-mono transition-colors flex items-center gap-1 shadow-xs"
        >
          <span className="material-symbols-outlined text-[14px] text-primary">visibility</span>
          <span>Inspect</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-5 pb-10">
      {/* Title Header */}
      <div className="page-header">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-on-surface tracking-tight font-sans">Incident & Hazard Management Command</h1>
            <span className="font-mono text-[10px] bg-rose-50 text-error border border-rose-200 px-2 py-0.5 rounded font-semibold uppercase">
              REAL-TIME HAZARD REGISTRY
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5 font-sans">
            Transportation Disruption Log, Active Ground Clearance & Emergency Operations
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">add_alert</span>
          <span>Report New Incident</span>
        </button>
      </div>

      {/* KPI Ribbon matching Stitch incident_management_light */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-surface-container-lowest border border-outline-variant p-3.5 rounded shadow-xs">
          <span className="text-[10px] font-mono text-outline uppercase font-semibold">Total Logged Hazards</span>
          <div className="text-xl font-bold font-mono text-on-surface mt-0.5">{incidents.length}</div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-3.5 rounded shadow-xs">
          <span className="text-[10px] font-mono text-outline uppercase font-semibold">Critical Blockages</span>
          <div className="text-xl font-bold font-mono text-error mt-0.5">
            {incidents.filter(i => i.severity === 'Critical').length}
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-3.5 rounded shadow-xs">
          <span className="text-[10px] font-mono text-outline uppercase font-semibold">Active Clearances</span>
          <div className="text-xl font-bold font-mono text-amber-700 mt-0.5">
            {incidents.filter(i => i.status === 'Active').length}
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-3.5 rounded shadow-xs">
          <span className="text-[10px] font-mono text-outline uppercase font-semibold">Resolved Today</span>
          <div className="text-xl font-bold font-mono text-tertiary mt-0.5">
            {incidents.filter(i => i.status === 'Resolved').length}
          </div>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterCategory={filterSeverity}
        onCategoryChange={setFilterSeverity}
        categoryOptions={['Critical', 'High', 'Medium', 'Low']}
        placeholder="Search incident ID, title, route, location..."
      />

      {/* Main Incidents Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        onRowClick={(row) => onSelectIncident(row)}
      />

      {/* Selected Incident Drawer */}
      {selectedIncident && (
        <IncidentPanel
          incident={selectedIncident}
          onClose={onCloseIncidentPanel}
        />
      )}

      {/* Modal for reporting new incident */}
      <NewIncidentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitIncident={onAddIncident}
      />
    </div>
  );
}
