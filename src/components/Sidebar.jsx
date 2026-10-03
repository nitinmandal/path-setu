import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ mobileOpen, onCloseMobile, unreadAlertsCount = 0, activeIncidentCount = 0 }) {
  const navItems = [
    { path: '/', label: 'Operations Dashboard', icon: 'monitoring' },
    { path: '/map', label: 'Live GIS Map', icon: 'public', badge: 'LIVE', badgeColor: 'text-tertiary bg-emerald-50 border-emerald-200' },
    { path: '/route-intelligence', label: 'Route Intelligence', icon: 'alt_route' },
    { path: '/alternative-routes', label: 'Alternative Routes', icon: 'compare_arrows' },
    { path: '/incidents', label: 'Incidents', icon: 'emergency_heat', badge: activeIncidentCount || undefined, badgeColor: 'text-error bg-rose-50 border-rose-200' },
    { path: '/logistics', label: 'Logistics & Fleet', icon: 'local_shipping' },
    { path: '/alerts', label: 'Alert Center', icon: 'notifications_active', badge: unreadAlertsCount || undefined, badgeColor: 'text-secondary bg-sky-50 border-sky-200' },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-surface-container-lowest border-r border-outline-variant text-on-surface shadow-sm">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo & Header Header */}
        <div className="h-14 px-4 border-b border-outline-variant flex items-center justify-between gap-2 bg-surface-container-lowest">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white shrink-0 shadow-sm font-bold">
              <span className="material-symbols-outlined text-[20px]">navigation</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-on-surface tracking-tight truncate leading-none">Path Setu</span>
              <span className="font-mono text-[10px] text-primary truncate mt-0.5 tracking-wider uppercase font-semibold">Mission Control</span>
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-surface-container-low border border-outline-variant font-mono text-[10px] text-on-surface-variant font-medium">OPS v2.4</span>
        </div>

        {/* Operational Status Subheader */}
        <div className="px-4 py-1.5 border-b border-outline-variant/60 bg-surface-container-low flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase text-outline tracking-wider font-semibold">Operational Units</span>
          <span className="font-mono text-[10px] text-tertiary font-semibold flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary"></span>SYNCED
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-1.5 py-2 flex flex-col gap-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-xs transition-colors rounded-none border-l-2 ${
                  isActive
                    ? 'bg-blue-50/80 text-primary border-primary font-semibold'
                    : 'text-on-surface-variant hover:bg-slate-100/70 hover:text-on-surface border-transparent font-medium'
                }`
              }
            >
              <span className="material-symbols-outlined text-[18px] flex-shrink-0">{item.icon}</span>
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className={`ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded border font-semibold ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer Info */}
      <div className="border-t border-outline-variant bg-surface-container-lowest p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between text-on-surface-variant font-mono text-[10px] px-1">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span className="text-on-surface font-semibold">TELEMETRY</span>
          </div>
          <span className="text-tertiary font-semibold">NOMINAL 99.8%</span>
        </div>

        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 border border-outline-variant text-outline uppercase tracking-wider font-medium">
            Demo Stream Active
          </span>
        </div>

        <div className="pt-2 border-t border-outline-variant/60 flex items-center gap-2.5 px-1">
          <div className="w-8 h-8 rounded bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-primary text-[18px]">badge</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-on-surface font-semibold truncate leading-tight">S. Rao</span>
            <span className="font-mono text-[10px] text-outline truncate leading-tight mt-0.5">Dispatch Lead • Sec-04</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-64 z-50" aria-label="Primary navigation">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Content */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="relative h-full">
          <button
            onClick={onCloseMobile}
            className="absolute top-3 right-3 text-on-surface-variant hover:text-on-surface p-1 rounded bg-slate-100 z-10"
            aria-label="Close Sidebar"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          {sidebarContent}
        </div>
      </aside>
    </>
  );
}
