import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ onToggleMobileSidebar, unreadAlertsCount = 0 }) {
  const [timeString, setTimeString] = useState('');
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getBreadcrumbPage = () => {
    switch (location.pathname) {
      case '/': return 'OPERATIONS DASHBOARD';
      case '/map': return 'LIVE GIS MAP';
      case '/route-intelligence': return 'ROUTE INTELLIGENCE';
      case '/alternative-routes': return 'ALTERNATIVE DETOURS';
      case '/incidents': return 'INCIDENT REGISTRY';
      case '/logistics': return 'LOGISTICS & FLEET';
      case '/alerts': return 'ALERT CENTER';
      default: return 'TACTICAL DISPATCH';
    }
  };

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-14 bg-surface-container-lowest border-b border-outline-variant z-40 px-4 flex items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden text-on-surface-variant hover:text-on-surface p-1.5 rounded bg-surface-container-low border border-outline-variant"
          aria-label="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-outline truncate">
          <span className="text-on-surface-variant font-medium">PATH SETU</span>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-medium">{getBreadcrumbPage()}</span>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface font-semibold truncate hidden sm:inline">GRID-NORTH</span>
        </div>

        {/* Live Simulation Indicator */}
        <div className="hidden xl:flex items-center gap-1.5 px-2 py-1 rounded bg-surface-container-low border border-outline-variant font-mono text-[10px] text-outline">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
          <span className="text-on-surface-variant font-medium">Simulated Live Feed</span>
          <span className="text-outline-variant">•</span>
          <span className="text-primary font-semibold">{timeString || 'UTC+05:30 14:32:08'}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Search Bar */}
        <div className="relative hidden sm:flex items-center">
          <span className="material-symbols-outlined absolute left-2.5 text-outline text-[16px] pointer-events-none">search</span>
          <input
            className="w-48 lg:w-72 h-8 pl-8 pr-3 bg-surface-container-low border border-outline-variant rounded text-on-surface placeholder:text-outline font-sans text-xs focus:outline-none focus:border-primary focus:bg-white transition-colors"
            placeholder="Find route, road, vehicle, or incident ID..."
            type="text"
          />
        </div>

        {/* Status Indicators */}
        <div className="hidden md:flex items-center gap-1.5 border-x border-outline-variant/60 px-3">
          <Link
            to="/map"
            className="h-8 px-2.5 bg-white border border-outline-variant hover:border-primary rounded text-on-surface flex items-center gap-1.5 font-mono text-[11px] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">layers</span>
            <span className="hidden lg:inline font-medium">GIS Layers</span>
          </Link>
          <span className="h-8 px-2 bg-rose-50 border border-rose-200 text-error rounded font-mono text-[11px] flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
            <span>CRIT: 1</span>
          </span>
          <span className="h-8 px-2 bg-amber-50 border border-amber-200 text-amber-700 rounded font-mono text-[11px] flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>WARN: 3</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 border border-emerald-200 font-mono text-[11px] text-emerald-700 font-semibold">
            <span className="material-symbols-outlined text-[14px] text-tertiary">health_metrics</span>
            <span>SYS OK</span>
          </div>

          <Link
            to="/alerts"
            className="relative p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-slate-100 rounded transition-colors"
            title="Operational Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error ring-2 ring-white"></span>
            )}
          </Link>

          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white shadow-sm font-bold text-xs">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
