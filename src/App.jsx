import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const LiveMapPage = lazy(() => import('./pages/LiveMapPage'));
const RouteIntelligencePage = lazy(() => import('./pages/RouteIntelligencePage'));
const AlternativeRoutesPage = lazy(() => import('./pages/AlternativeRoutesPage'));
const IncidentsPage = lazy(() => import('./pages/IncidentsPage'));
const LogisticsPage = lazy(() => import('./pages/LogisticsPage'));
const AlertsPage = lazy(() => import('./pages/AlertsPage'));

import { initialIncidents } from './data/incidents';
import { initialVehicles } from './data/vehicles';
import { routeDatabase } from './data/routes';
import { initialShipments } from './data/shipments';
import { initialAlerts } from './data/alerts';
import { regionalDistricts } from './data/districts';

/** Pages that need full-bleed content (no inner padding wrapper) */
const FULLBLEED_ROUTES = ['/map'];

function AppLayout({ children, mobileSidebarOpen, setMobileSidebarOpen, unreadAlertsCount, activeIncidentCount }) {
  const location = useLocation();
  const isFullbleed = FULLBLEED_ROUTES.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans">
      {/* Fixed Header — spans right of sidebar on desktop */}
      <Header
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        unreadAlertsCount={unreadAlertsCount}
      />

      <div className="flex flex-1 relative">
        {/* Fixed Sidebar */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          unreadAlertsCount={unreadAlertsCount}
          activeIncidentCount={activeIncidentCount}
        />

        {/* Main content area — offset for sidebar (md:ml-64) and header (pt-14) */}
        <main className="flex-1 md:ml-64 pt-14 min-h-screen bg-background overflow-hidden">
          {isFullbleed ? (
            // Full-bleed: no inner padding, map fills the remaining viewport
            <div className="h-[calc(100vh-3.5rem)] overflow-hidden">
              {children}
            </div>
          ) : (
            // Standard: padded content area with max-width
            <div className="p-4 md:p-6 max-w-7xl mx-auto w-full overflow-y-auto h-[calc(100vh-3.5rem)]">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [routes, setRoutes] = useState(routeDatabase);
  const [shipments, setShipments] = useState(initialShipments);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [districts, setDistricts] = useState(regionalDistricts);

  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Add Incident handler
  const handleAddIncident = (newInc) => {
    setIncidents(prev => [newInc, ...prev]);
    // Add corresponding alert
    const newAlert = {
      id: `ALT-${Math.floor(950 + Math.random() * 50)}`,
      category: newInc.severity === 'Critical' ? 'Critical' : 'Warning',
      title: `NEW HAZARD REPORTED: ${newInc.title}`,
      message: `${newInc.type} incident logged at ${newInc.location}. Corridor risk elevated.`,
      timestamp: 'Just Now',
      affectedRoute: newInc.affectedRoute,
      acknowledged: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  // Acknowledge Alert handler
  const handleAcknowledgeAlert = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const handleAcknowledgeAllAlerts = () => {
    setAlerts(prev => prev.map(a => ({ ...a, acknowledged: true })));
  };

  // Continuous vehicle simulation via interval
  const simulationRef = React.useRef(null);

  const startSimulation = () => {
    if (simulationRef.current) return;
    simulationRef.current = setInterval(() => {
      setVehicles(prev => prev.map(v => {
        const latDelta = (Math.random() - 0.5) * 0.008;
        const lngDelta = (Math.random() - 0.5) * 0.008;
        return {
          ...v,
          coordinates: [v.coordinates[0] + latDelta, v.coordinates[1] + lngDelta],
          speed: Math.max(20, Math.min(65, Math.floor(v.speed + (Math.random() * 10 - 5))))
        };
      }));
    }, 2000);
  };

  const stopSimulation = () => {
    if (simulationRef.current) {
      clearInterval(simulationRef.current);
      simulationRef.current = null;
    }
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => stopSimulation();
  }, []);

  const unreadAlertsCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <Router>
      <AppLayout
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        unreadAlertsCount={unreadAlertsCount}
        activeIncidentCount={incidents.filter(incident => incident.status === 'Active').length}
      >
        <Suspense fallback={<div className="flex min-h-[12rem] items-center justify-center text-sm text-on-surface-variant" role="status">Loading workspace…</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                incidents={incidents}
                vehicles={vehicles}
                routes={routes}
                alerts={alerts}
                shipments={shipments}
                districts={districts}
                onSelectIncident={setSelectedIncident}
              />
            }
          />
          <Route
            path="/map"
            element={
              <LiveMapPage
                incidents={incidents}
                vehicles={vehicles}
                routes={routes}
                selectedIncident={selectedIncident}
                onSelectIncident={setSelectedIncident}
                selectedVehicle={selectedVehicle}
                onSelectVehicle={setSelectedVehicle}
                onCloseIncidentPanel={() => setSelectedIncident(null)}
              />
            }
          />
          <Route
            path="/route-intelligence"
            element={
              <RouteIntelligencePage
                routes={routes}
                incidents={incidents}
                vehicles={vehicles}
              />
            }
          />
          <Route
            path="/alternative-routes"
            element={
              <AlternativeRoutesPage
                routes={routes}
                incidents={incidents}
                vehicles={vehicles}
              />
            }
          />
          <Route
            path="/incidents"
            element={
              <IncidentsPage
                incidents={incidents}
                onAddIncident={handleAddIncident}
                selectedIncident={selectedIncident}
                onSelectIncident={setSelectedIncident}
                onCloseIncidentPanel={() => setSelectedIncident(null)}
              />
            }
          />
          <Route
            path="/logistics"
            element={
              <LogisticsPage
                shipments={shipments}
                vehicles={vehicles}
                onStartSimulation={startSimulation}
                onStopSimulation={stopSimulation}
              />
            }
          />
          <Route
            path="/alerts"
            element={
              <AlertsPage
                alerts={alerts}
                onAcknowledgeAlert={handleAcknowledgeAlert}
                onAcknowledgeAll={handleAcknowledgeAllAlerts}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </AppLayout>
    </Router>
  );
}
