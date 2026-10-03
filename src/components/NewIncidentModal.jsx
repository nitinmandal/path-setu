import React, { useState } from 'react';

export default function NewIncidentModal({ isOpen, onClose, onSubmitIncident }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Landslide',
    severity: 'High',
    location: '',
    affectedRoute: 'NH-10 (Siliguri – Gangtok)',
    description: '',
    lat: '27.18',
    lng: '88.51'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location) return;

    const newIncident = {
      id: `INC-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      type: formData.type,
      severity: formData.severity,
      status: 'Active',
      location: formData.location,
      coordinates: [parseFloat(formData.lat) || 27.18, parseFloat(formData.lng) || 88.51],
      affectedRoute: formData.affectedRoute,
      description: formData.description || 'Reported via Mission Control Field Alert Form.',
      reportedTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' IST (Just Now)',
      estimatedClearance: 'Pending Ground Evaluation',
      impactedDistricts: ['Local District']
    };

    onSubmitIncident(newIncident);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="bg-surface-container-lowest border border-outline-variant rounded max-h-[calc(100vh-2rem)] max-w-lg w-full overflow-y-auto p-5 sm:p-6 space-y-4 shadow-xl" role="dialog" aria-modal="true" aria-labelledby="new-incident-title">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-amber-600">warning</span>
            <h3 id="new-incident-title" className="font-bold text-on-surface text-base">Report New Transportation Hazard</h3>
          </div>
          <button type="button" onClick={onClose} className="text-outline hover:text-on-surface" aria-label="Close report incident form">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs text-on-surface">
          <div>
            <label htmlFor="incident-title" className="block text-outline font-mono text-[11px] font-semibold uppercase mb-1">Incident Title *</label>
            <input
              id="incident-title"
              type="text"
              required
              placeholder="e.g. Flash Flood Culvert Washout"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="control-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="incident-type" className="block text-outline font-mono text-[11px] font-semibold uppercase mb-1">Incident Type</label>
              <select
                id="incident-type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="control-field"
              >
                <option value="Landslide">Landslide</option>
                <option value="Flood">Flood</option>
                <option value="Road Damage">Road Damage</option>
                <option value="Bridge Damage">Bridge Damage</option>
                <option value="Heavy Rainfall">Heavy Rainfall</option>
                <option value="Traffic">Traffic</option>
                <option value="Accident">Accident</option>
              </select>
            </div>

            <div>
              <label htmlFor="incident-severity" className="block text-outline font-mono text-[11px] font-semibold uppercase mb-1">Severity Level</label>
              <select
                id="incident-severity"
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                className="control-field"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="incident-location" className="block text-outline font-mono text-[11px] font-semibold uppercase mb-1">Location Details *</label>
            <input
              id="incident-location"
              type="text"
              required
              placeholder="e.g. NH-10 Km 54 near Melli Bridge"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="control-field"
            />
          </div>

          <div>
            <label htmlFor="incident-route" className="block text-outline font-mono text-[11px] font-semibold uppercase mb-1">Affected Corridor</label>
            <input
              id="incident-route"
              type="text"
              placeholder="e.g. NH-10 (Siliguri – Gangtok)"
              value={formData.affectedRoute}
              onChange={(e) => setFormData({ ...formData, affectedRoute: e.target.value })}
              className="control-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="incident-latitude" className="block text-outline font-mono text-[11px] font-semibold uppercase mb-1">Latitude</label>
              <input
                id="incident-latitude"
                type="text"
                value={formData.lat}
                onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                className="control-field font-mono"
              />
            </div>
            <div>
              <label htmlFor="incident-longitude" className="block text-outline font-mono text-[11px] font-semibold uppercase mb-1">Longitude</label>
              <input
                id="incident-longitude"
                type="text"
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                className="control-field font-mono"
              />
            </div>
          </div>

          <div>
            <label htmlFor="incident-description" className="block text-outline font-mono text-[11px] font-semibold uppercase mb-1">Operational Description</label>
            <textarea
              id="incident-description"
              rows={3}
              placeholder="Brief operational summary..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="control-field"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-outline-variant flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-on-surface rounded font-semibold transition-colors border border-outline-variant"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              <span>Submit Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
