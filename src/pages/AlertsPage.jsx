import React, { useState } from 'react';
import AlertItem from '../components/AlertItem';
import FilterBar from '../components/FilterBar';

export default function AlertsPage({ alerts = [], onAcknowledgeAlert, onAcknowledgeAll }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const filteredAlerts = alerts.filter(alt => {
    const matchesCategory = filterCategory === 'ALL' || alt.category === filterCategory;
    const matchesSearch = searchTerm === '' ||
      alt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alt.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const unreadCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="space-y-5 pb-10">
      {/* Title Header */}
      <div className="page-header">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-on-surface tracking-tight font-sans">Operational Alerts & Notification Center</h1>
            <span className="font-mono text-[10px] bg-sky-50 text-secondary border border-sky-200 px-2 py-0.5 rounded font-semibold uppercase">
              {unreadCount} UNREAD
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5 font-sans">
            Real-Time Tactical Feeds & Corridor Status Bulletins
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onAcknowledgeAll}
            className="bg-white hover:bg-slate-50 text-on-surface border border-outline-variant text-xs font-semibold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px] text-tertiary">done_all</span>
            <span>Acknowledge All ({unreadCount})</span>
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterCategory={filterCategory}
        onCategoryChange={setFilterCategory}
        categoryOptions={['Critical', 'Warning', 'Information']}
        placeholder="Search alert title or message..."
      />

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alt) => (
            <AlertItem
              key={alt.id}
              alert={alt}
              onAcknowledge={onAcknowledgeAlert}
            />
          ))
        ) : (
          <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded text-center text-outline font-mono text-xs shadow-xs">
            No matching operational alerts found.
          </div>
        )}
      </div>
    </div>
  );
}
