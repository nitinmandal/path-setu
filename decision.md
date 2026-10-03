# Path Setu — Decision Log

## Purpose

This document records the technical and product decisions made for Path Setu and the reasons behind them.

---

## D-01 — Keep Path Setu as a frontend-first mini project

**Decision:** Build Path Setu primarily as a React frontend with local demo data.

**Reason:** The project is a college mini project. A backend/database would add complexity without improving the core demonstration enough to justify it.

---

## D-02 — No database

**Decision:** Do not use MongoDB, PostgreSQL, Supabase, Firebase, or another database.

**Reason:** The MVP only needs simulated data. Local JavaScript data files are sufficient.

---

## D-03 — No custom backend

**Decision:** Do not build Node.js/Express for the MVP.

**Reason:** There are no essential server-side operations. Route calculations, filtering, demo alerts, and UI state can run in the browser.

---

## D-04 — Use React + Vite

**Decision:** React + Vite is the frontend foundation.

**Reason:** It is lightweight, widely used, easy to deploy, and appropriate for a frontend-heavy mini project.

---

## D-05 — Use JavaScript instead of TypeScript

**Decision:** Use JavaScript.

**Reason:** The application is small and the user wants to avoid unnecessary complexity. TypeScript can be introduced later if the project grows.

---

## D-06 — Use Tailwind CSS with Stitch design tokens

**Decision:** Use Tailwind CSS v4 for styling, configured with the Google Stitch light operations design token set.

**Reason:** Tailwind allows the Stitch-generated design to be reproduced quickly while keeping styling inside the frontend codebase. The Stitch design system provides a professional, human-designed GIS/logistics aesthetic without AI-generic SaaS patterns.

**Design token set used:**

```text
primary: #2563eb
background: #f8fafc (Stitch: #F8FAFC)
surface-container-lowest: #ffffff
on-surface: #0f172a
outline-variant: #cbd5e1
tertiary (operational green): #16a34a
error (critical red): #dc2626
```

**Fonts:** Geist (body), JetBrains Mono (labels/data values)

---

## D-07 — Use Leaflet + React-Leaflet

**Decision:** Use Leaflet with React-Leaflet for maps.

**Reason:** Path Setu is map-centric. Leaflet is free, lightweight, open source, and sufficient for markers, layers, routes, and basic GIS visualization.

---

## D-08 — Use OpenStreetMap

**Decision:** Use OpenStreetMap as the map tile/data source for the demo.

**Reason:** It avoids paid map APIs.

**Constraint:** Follow OpenStreetMap tile usage and attribution requirements. Do not treat public tile servers as unlimited production infrastructure.

---

## D-09 — Use local simulated data

**Decision:** Store incidents, vehicles, routes, shipments, alerts, and districts in local JavaScript data files.

**Reason:** It makes the application deterministic, easy to demo, free, and simple to understand.

---

## D-10 — Route risk is rules-based

**Decision:** Use a transparent rules-based risk calculation.

**Reason:** There is no need to train or deploy an ML model for a mini project. A transparent formula is easier to explain and verify.

The application must not claim that the score comes from machine learning.

**Formula:**

```text
Raw Score = (Weather Risk + Road Condition Risk + Incident Exposure + Traffic Risk)
            × Vehicle Multiplier
            × Cargo Multiplier
```

Risk thresholds:

```text
≤30    Low
31–55  Moderate
56–75  High
>75    Critical
```

Implemented in `src/utils/riskCalculator.js`.

---

## D-11 — Recharts only for meaningful analytics

**Decision:** Use Recharts for a small number of useful charts.

**Reason:** Charts should communicate operational information, not exist only for decoration.

---

## D-12 — Use Material Symbols Outlined as primary icon set

**Decision:** Use Material Symbols Outlined (Google Fonts) as the primary icon set instead of Lucide React.

**Reason:** The Stitch design system uses Material Symbols Outlined throughout. Switching to it ensures visual consistency with the Stitch reference design. Lucide React is still installed but not actively used in the current implementation.

**Impact:** `index.html` loads the Material Symbols Outlined font from Google Fonts CDN. All component icon references use `<span className="material-symbols-outlined">icon_name</span>` syntax.

---

## D-13 — No state-management library

**Decision:** Use React state primitives.

**Reason:** The project does not have enough shared state to justify Redux, Zustand, or another state-management dependency.

---

## D-14 — React Router for navigation

**Decision:** Use React Router.

**Reason:** Path Setu has multiple pages and needs clean client-side navigation.

**Actual routes:**

```text
/                  → Dashboard
/map               → Live GIS Map
/route-intelligence → Route Intelligence
/alternative-routes → Alternative Routes
/incidents         → Incidents
/logistics         → Logistics & Fleet
/alerts            → Alert Center
```

---

## D-15 — Gemini is optional

**Decision:** AI functionality is optional and must not be required for the core application.

**Reason:** The project should remain functional even without an AI API key or network access to an AI service.

If added, Gemini should explain existing application data rather than invent facts.

---

## D-16 — Vercel for deployment

**Decision:** Deploy the frontend to Vercel.

**Reason:** It is simple for a Vite/React project and has a suitable free tier for a small demo.

---

## D-17 — No real-world data claims

**Decision:** Clearly label simulated data.

**Reason:** The application is a demonstration. It must not present invented incidents, government statistics, vehicle positions, or weather conditions as real information.

---

## D-18 — Use the Stitch light operations UI design

**Decision:** Use the Google Stitch light GIS/operations dashboard design aesthetic.

**Reason:** The product should look credible and usable rather than like a generic AI-generated SaaS template. The Stitch design provides a professional, restrained GIS/logistics aesthetic without excessive decoration.

**Visual direction:**
- White/slate light backgrounds
- Blue primary accent (#2563eb)
- Monospace labels for all data values
- Material Symbols Outlined icons
- Sharp (not pill-shaped) borders
- Functional typography hierarchy

Avoid: purple gradients, excessive glassmorphism, pill-heavy UI, fake metrics, fake reviews, AI sparkle graphics, excessive animations, decorative effects.

---

## D-19 — Map is the primary visual

**Decision:** Make the map the central visual component of the dashboard.

**Reason:** Location and route conditions are the core value of Path Setu.

---

## D-20 — Build only the essential pages

**Decision:** Build Dashboard, Live Map, Route Intelligence, Alternative Routes, Incidents, Logistics, and Alerts.

**Reason:** These pages cover the core user journey without expanding the mini project unnecessarily.

---

## D-21 — No real-time infrastructure

**Decision:** Vehicle positions and operational changes are simulated.

**Reason:** Real-time GPS requires external systems and is unnecessary for demonstrating the concept.

---

## D-22 — Keep the codebase understandable

**Decision:** Prefer simple files and clear feature boundaries over elaborate architecture.

**Reason:** The project should be easy for a student to explain during a viva, presentation, or code review.

---

## D-23 — AppLayout component for layout routing

**Decision:** Extract a separate `AppLayout` component inside `App.jsx` that handles the sidebar/header layout and differentiates between full-bleed pages (Live Map) and standard padded pages (all others).

**Reason:** The Live Map page must fill the full available viewport so the Leaflet map is maximally visible. Other pages need standard content padding. A simple `isFullbleed` flag derived from the current route handles this cleanly.

**Impact:** `App.jsx` contains both `AppLayout` and `App` components. The Live Map route (`/map`) renders its children in a `h-[calc(100vh-3.5rem)]` container with no padding. All other routes render in a `p-4 md:p-6` padded container.

---

## D-24 — Flat component directory structure

**Decision:** Use a single flat `src/components/` directory instead of nested subdirectories.

**Reason:** The project has a small number of components. Sub-directories add navigational overhead without meaningful organization benefit at this scale.

**Current component files:**

```text
src/components/
  AlertItem.jsx
  DataTable.jsx
  FilterBar.jsx
  Header.jsx
  IncidentPanel.jsx
  MapLayerControl.jsx
  MapView.jsx
  MetricCard.jsx
  NewIncidentModal.jsx
  RiskScore.jsx
  RouteComparison.jsx
  Sidebar.jsx
  StatusBadge.jsx
```
