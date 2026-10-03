// Path Setu - Mission Control Application Logic

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initNavigation();
  initGisMap();
  initRouteIntelligence();
  initIncidentManagement();
  initModals();
});

/**
 * Real-time simulated clock update in header
 */
function initClock() {
  const clockElements = document.querySelectorAll('.live-clock');
  
  function updateTime() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    const timeStr = `UTC+05:30 ${hrs}:${mins}:${secs}`;
    
    clockElements.forEach(el => {
      el.textContent = timeStr;
    });
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/**
 * Single Page Application Navigation & Active Page State Management
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('[data-path]');
  const pageViews = document.querySelectorAll('.page-view');
  const breadcrumbCurrent = document.getElementById('breadcrumb-current');

  const pageTitles = {
    'operations-dashboard': 'OPERATIONS DASHBOARD',
    'live-gis-map': 'LIVE GIS MAP',
    'route-intelligence': 'ROUTE INTELLIGENCE',
    'logistics-fleet': 'LOGISTICS & FLEET',
    'incidents': 'INCIDENTS REGISTRY',
    'weather-risk': 'WEATHER RISK',
    'alert-center': 'ALERT CENTER',
    'analytics': 'ANALYTICS & METRICS',
    'settings': 'SYSTEM SETTINGS'
  };

  function switchPage(targetPath) {
    if (!targetPath) return;

    // Hide all pages, show target page
    pageViews.forEach(view => {
      if (view.id === targetPath) {
        view.classList.remove('hidden');
      } else {
        view.classList.add('hidden');
      }
    });

    // Update nav links styling
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('data-path');
      if (linkPath === targetPath) {
        link.setAttribute('aria-current', 'page');
        link.className = 'flex items-center gap-space-md px-space-md py-space-sm rounded-none transition-colors bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold text-body-md';
        const icon = link.querySelector('.material-symbols-outlined');
        if (icon) {
          icon.classList.remove('text-slate-400', 'text-slate-500');
          icon.classList.add('text-blue-600');
        }
      } else if (link.tagName === 'A' && link.closest('nav')) {
        link.removeAttribute('aria-current');
        link.className = 'flex items-center gap-space-md px-space-md py-space-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-none border-l-2 border-transparent transition-colors font-body-md text-body-md';
        const icon = link.querySelector('.material-symbols-outlined');
        if (icon) {
          icon.classList.remove('text-blue-600');
          icon.classList.add('text-slate-400');
        }
      }
    });

    // Update breadcrumb
    if (breadcrumbCurrent && pageTitles[targetPath]) {
      breadcrumbCurrent.textContent = pageTitles[targetPath];
    }

    // Scroll to top of main container
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Attach click listeners to all elements with data-path
  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-path]');
    if (trigger) {
      e.preventDefault();
      const targetPath = trigger.getAttribute('data-path');
      switchPage(targetPath);
    }
  });

  // Handle initial page hash or default to operations-dashboard
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById(initialHash)) {
    switchPage(initialHash);
  } else {
    switchPage('operations-dashboard');
  }
}

/**
 * Live GIS Map Interactivity, Layer Drawer Toggle, & Controls
 */
function initGisMap() {
  const toggleBtn = document.getElementById('toggleLayersBtn');
  const sidebar = document.getElementById('gisSidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
      } else {
        sidebar.classList.add('hidden');
      }
    });
  }

  // Map Mode Switchers (Vector / Satellite)
  const mapModeButtons = document.querySelectorAll('.map-mode-btn');
  mapModeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      mapModeButtons.forEach(b => {
        b.className = 'h-6 px-2.5 text-slate-600 hover:text-slate-900 font-label-sm text-label-sm rounded-sm font-medium transition-colors';
      });
      btn.className = 'h-6 px-2.5 bg-white text-blue-700 border border-slate-200/90 font-label-sm text-label-sm rounded-sm font-bold shadow-xs';
      showToast(`Map view mode set to: ${btn.textContent.trim()}`);
    });
  });

  // Layer Checkboxes interactivity
  const layerCheckboxes = document.querySelectorAll('#gisSidebar input[type="checkbox"]');
  layerCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const labelText = cb.nextElementSibling ? cb.nextElementSibling.textContent.trim() : 'Layer';
      showToast(`${labelText} ${cb.checked ? 'Enabled' : 'Disabled'}`);
    });
  });
}

/**
 * Route Intelligence Parameter Calculation & Interactive Overrides
 */
function initRouteIntelligence() {
  const calcBtn = document.getElementById('btnExecuteRouteAnalysis');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const originalText = calcBtn.innerHTML;
      calcBtn.disabled = true;
      calcBtn.innerHTML = `<span class="material-symbols-outlined text-[18px] animate-spin">sync</span><span>Calculating Optimal Corridors...</span>`;

      setTimeout(() => {
        calcBtn.disabled = false;
        calcBtn.innerHTML = originalText;
        showToast('Route Risk Analysis re-calculated. Corridor Alfa remains optimal (Score 84/100).');
      }, 800);
    });
  }
}

/**
 * Incident Management Registry Filtering, Row Selection & Details Update
 */
function initIncidentManagement() {
  const filterBtns = document.querySelectorAll('.incident-filter-btn');
  const incidentRows = document.querySelectorAll('.incident-table-row');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => {
        b.className = 'px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 font-label-sm text-[11px] rounded font-medium transition-colors incident-filter-btn';
      });
      btn.className = 'px-3 py-1.5 bg-blue-600 text-white font-label-sm text-[11px] rounded font-semibold shadow-xs incident-filter-btn';

      const filterCategory = btn.getAttribute('data-filter');
      incidentRows.forEach(row => {
        if (filterCategory === 'all' || row.getAttribute('data-status') === filterCategory) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // Global window helper for row click selection
  window.selectIncident = function(id, name, location, route, status, progress, elev, volume, team, weather) {
    // Update active row visual indicator
    incidentRows.forEach(r => {
      r.classList.remove('bg-blue-50/60', 'border-l-4', 'border-l-blue-600');
      r.classList.add('border-l-4', 'border-l-transparent');
    });

    const activeRow = document.querySelector(`[data-incident-id="${id}"]`);
    if (activeRow) {
      activeRow.classList.add('bg-blue-50/60', 'border-l-4', 'border-l-blue-600');
    }

    // Update Detail Drawer fields
    const elId = document.getElementById('detail-inc-id');
    const elName = document.getElementById('detail-inc-name');
    const elLoc = document.getElementById('detail-inc-loc');
    const elRoute = document.getElementById('detail-inc-route');
    const elStatus = document.getElementById('detail-inc-status');
    const elProg = document.getElementById('detail-inc-prog');
    const elProgBar = document.getElementById('detail-inc-prog-bar');
    const elElev = document.getElementById('detail-inc-elev');
    const elVol = document.getElementById('detail-inc-vol');
    const elTeam = document.getElementById('detail-inc-team');
    const elWeather = document.getElementById('detail-inc-weather');

    if (elId) elId.textContent = id;
    if (elName) elName.textContent = name;
    if (elLoc) elLoc.textContent = location;
    if (elRoute) elRoute.textContent = route;
    if (elStatus) elStatus.textContent = status;
    if (elProg) elProg.textContent = `${progress}%`;
    if (elProgBar) elProgBar.style.width = `${progress}%`;
    if (elElev) elElev.textContent = elev;
    if (elVol) elVol.textContent = volume;
    if (elTeam) elTeam.textContent = team;
    if (elWeather) elWeather.textContent = weather;

    showToast(`Loaded details for incident ${id} (${name})`);
  };
}

/**
 * Modal Dialog Controllers & Notification Toasts
 */
function initModals() {
  const modal = document.getElementById('modal-new-obstacle');
  const openBtns = document.querySelectorAll('.btn-open-modal');
  const closeBtns = document.querySelectorAll('.btn-close-modal');
  const form = document.getElementById('form-log-obstacle');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.remove('hidden');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.add('hidden');
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('hidden');
      showToast('Field Obstacle logged successfully. QRF dispatch notification sent.');
    });
  }
}

/**
 * Lightweight Tactical Toast Notification Popup
 */
function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto bg-slate-900 text-white border border-slate-700 px-3.5 py-2 rounded shadow-lg flex items-center gap-2 font-body-sm text-body-sm animate-fade-in';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-blue-400 text-[18px]">info</span>
    <span class="font-medium">${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Make showToast available globally
window.showToast = showToast;
window.triggerAlert = (msg) => showToast(msg);
