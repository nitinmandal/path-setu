# Path Setu — Mini Project PRD

## 1. Product Overview

**Path Setu** is a responsive web application for visualizing transportation accessibility, incidents, route risk, and logistics activity in difficult or disruption-prone regions.

This is a **college mini project**, not a production government platform. The application should demonstrate a clear combination of:

- GIS visualization
- Route intelligence
- Logistics monitoring
- Incident management
- Data visualization

The project must remain simple, free to build, easy to understand, and easy to demonstrate.

---

## 2. Problem

Transportation in difficult terrain can be affected by incidents, weather, road conditions, and route disruptions.

Path Setu provides a single web interface where a user can:

1. See the current operational situation.
2. Locate incidents on a map.
3. Inspect route risk.
4. Compare alternative routes.
5. View vehicles and shipments.
6. Review alerts.

For the mini project, all application data is simulated/local demo data.

---

## 3. Project Goals

### Primary goals

- Build a polished GIS-based dashboard.
- Demonstrate route-risk analysis.
- Demonstrate incident visualization.
- Demonstrate basic logistics monitoring.
- Create a responsive and professional frontend.
- Deploy the finished application publicly at no cost.

### Non-goals

Do NOT build:

- Native mobile applications
- IoT infrastructure
- Real GPS hardware integration
- Government-scale infrastructure
- Complex backend services
- Production authentication
- Production database infrastructure
- Real-time vehicle tracking
- Custom machine-learning training pipelines

---

# 4. Technology Stack

Use only the following technologies unless there is a clear implementation reason to add something else.

| Technology | Purpose |
|---|---|
| React + Vite | Frontend application |
| JavaScript | Application logic |
| Tailwind CSS v4 | Styling (with Stitch design tokens) |
| React Router | Page navigation |
| Leaflet + React-Leaflet | Interactive GIS map |
| OpenStreetMap | Map tiles |
| Recharts | Useful charts |
| Lucide React | Available but supplemented by Material Symbols |
| Material Symbols Outlined | Primary icon set (Google Fonts) |
| Local JSON/JS data | Demo data |
| Git + GitHub | Version control |
| Vercel | Deployment |

### Optional

**Gemini API** may be added later for route explanations or natural-language insights. It is not required for the core MVP.

Do not introduce Node.js, Express, MongoDB, PostgreSQL, PostGIS, Supabase, Firebase, Docker, Kubernetes, or paid APIs unless the project requirements are explicitly expanded.

---

# 5. Target User

The mini project demonstrates an interface for a:

**Logistics / Operations Coordinator**

The user wants to quickly understand:

- What incidents exist?
- Where are they?
- Which routes are risky?
- What alternative routes exist?
- Which shipments or vehicles are affected?

---

# 6. Core Application Flow

The primary demo flow is:

**Dashboard → Live Map → Select Incident → Inspect Route → Analyze Risk → Compare Alternative → Check Logistics → Review Alerts**

A user should be able to complete this flow without needing to understand the implementation.

---

# 7. Application Pages

## 7.1 Dashboard

Purpose: provide a quick operational overview.

Include:

- Page title
- Regional connectivity metric
- Active incidents
- At-risk routes
- Deliveries in transit
- Delayed deliveries
- Main regional map
- Recent incidents
- Important alerts

All metrics must use clearly labeled demo data.

---

## 7.2 Live Map

Purpose: provide the main GIS experience.

Display:

- Roads
- Incidents
- Vehicles
- Routes
- Risk areas
- Optional district boundaries

Map interactions:

- Zoom
- Pan
- Marker selection
- Layer visibility
- Incident filtering

Use Leaflet + React-Leaflet.

Use OpenStreetMap map tiles.

The map must remain the most visually important part of the application.

The Live Map page uses a full-bleed layout (no page padding) so the map fills all available space below the header.

---

## 7.3 Route Intelligence

Purpose: analyze a route using demo data.

Inputs:

- Origin
- Destination
- Vehicle type
- Cargo type

Action:

**Analyze Route**

Result should show:

- Recommended route
- Distance
- Estimated time
- Risk score
- Road condition
- Weather risk
- Incident exposure

### Risk model

Use a transparent rules-based demo calculation.

Example:

```text
Risk Score =
Weather Risk
+ Road Condition Risk
+ Incident Risk
+ Traffic Risk
```

The exact weights can be stored in a simple JavaScript configuration.

Do not claim that this is a trained ML model.

---

## 7.4 Alternative Routes

Show 2–3 simulated route options.

Each route displays:

- Distance
- ETA
- Risk score
- Major risk factors
- Status

Allow the user to compare routes.

Use a simple comparison table or structured route cards.

---

## 7.5 Incidents

Purpose: allow users to inspect transportation incidents.

Incident types:

- Landslide
- Flood
- Road Damage
- Bridge Damage
- Heavy Rainfall
- Traffic
- Accident

Incident fields:

- ID
- Type
- Location
- Severity
- Status
- Reported time
- Description
- Affected route

Features:

- Search
- Filter
- View details
- Map location

Optional:

A simple incident-report form can add a new incident to the current browser session.

It does not need persistent storage.

---

## 7.6 Logistics

Purpose: demonstrate logistics monitoring.

Display shipments and vehicles.

Shipment fields:

- Shipment ID
- Vehicle
- Origin
- Destination
- ETA
- Status
- Risk

Vehicle fields:

- Vehicle ID
- Current location
- Destination
- Speed
- Status

Vehicle positions are simulated.

Do not claim real-time GPS tracking.

---

## 7.7 Alerts

Purpose: show important operational notifications.

Alert categories:

- Critical
- Warning
- Information

Examples:

- Route risk increased
- Incident reported
- Shipment delayed
- Road condition changed

Alerts are generated from demo data/rules.

---

# 8. Dashboard Data

Use a small local dataset.

Suggested files:

```text
src/
├── data/
│   ├── incidents.js
│   ├── vehicles.js
│   ├── routes.js
│   ├── shipments.js
│   ├── alerts.js
│   └── districts.js
```

No database is required.

---

# 9. Map Data

The map should use:

- OpenStreetMap tiles
- Demo incident coordinates
- Demo vehicle coordinates
- Demo route lines
- Demo risk areas

Do not fabricate real-world incidents and present them as real.

Use a visible label such as:

**Demo / Simulated Data**

---

# 10. UI/UX Requirements

The design follows the **Google Stitch light operations theme** — a professional GIS/logistics operations interface.

### Visual style

- Light background (white / slate-50) with clean borders
- Blue as the primary accent (`#2563eb`)
- Green for operational/resolved, amber for warnings, red for critical
- Subtle borders (`border-outline-variant`)
- Compact monospace labels for data values
- Strong information hierarchy
- Map-first layout on the Live Map page
- Material Symbols Outlined for icons
- Geist font for body text, JetBrains Mono for labels and data

### Avoid

- Dark navy backgrounds (the previous dark theme was replaced by the Stitch light design)
- Purple gradients
- Neon effects
- Excessive glassmorphism
- Pill-shaped UI everywhere
- Emoji icons
- AI sparkle graphics
- Giant marketing hero sections
- Fake testimonials
- Fake company logos
- Fake statistics
- Excessive animations
- Cursor effects
- Parallax
- Decorative 3D elements
- Generic AI marketing copy

The application should look **human-designed and functional**, not like an AI-generated SaaS template.

---

# 11. Navigation

Desktop sidebar (fixed, 256px wide):

- Operations Dashboard (/)
- Live GIS Map (/map)
- Route Intelligence (/route-intelligence)
- Alternative Routes (/alternative-routes)
- Incidents (/incidents)
- Logistics & Fleet (/logistics)
- Alert Center (/alerts)

Mobile:

- Collapsible navigation drawer (hamburger in header)

Use React Router.

---

# 12. Reusable Components

Current component files under `src/components/`:

```text
Sidebar.jsx
Header.jsx
MetricCard.jsx
StatusBadge.jsx
MapView.jsx
MapLayerControl.jsx
IncidentPanel.jsx
RiskScore.jsx
RouteComparison.jsx
DataTable.jsx
FilterBar.jsx
AlertItem.jsx
NewIncidentModal.jsx
```

Do not create unnecessary abstractions for simple components.

---

# 13. State Management

Do not introduce a state-management library.

Use:

- React useState
- React useMemo
- React context only if genuinely necessary

Keep state local to the relevant feature.

---

# 14. Data Flow

The application follows:

**Local demo data → React state → UI components**

Example:

```text
incidents.js
    ↓
Dashboard / Incidents / Map
    ↓
User selects incident
    ↓
Selected incident state
    ↓
Incident details panel
```

Route analysis:

```text
User inputs origin/destination
    ↓
Route analysis function
    ↓
Risk calculation
    ↓
Route results
    ↓
Alternative routes
```

---

# 15. Charts

Use Recharts only for useful analytics.

Possible charts:

- Incident trend
- Shipment delays
- Route risk distribution

Avoid decorative charts.

---

# 16. Responsive Design

Desktop:

- Persistent sidebar (256px)
- Large map
- Multi-column dashboard

Tablet:

- Reduced sidebar
- Stacked content where necessary

Mobile:

- Navigation drawer
- Stacked metrics
- Full-width map
- Scrollable tables

Do not create a separate mobile application.

---

# 17. Accessibility

Provide:

- Readable contrast
- Keyboard focus states
- Labels for controls
- Meaningful button text
- Status communicated through text as well as color

---

# 18. Error / Empty / Loading States

Implement basic states:

- Map loading
- No incidents found
- No route found
- No alerts
- Invalid route input
- Empty logistics data

These states should be simple and professional.

---

# 19. Performance

Keep the application lightweight.

Avoid:

- Large dependencies
- Unnecessary animations
- Heavy image assets
- Unnecessary API requests

The project should load quickly on a normal laptop and mobile connection.

---

# 20. Deployment

Deploy the frontend to Vercel.

Repository:

GitHub

Deployment:

GitHub → Vercel

No paid hosting is required for the intended mini-project usage.

---

# 21. MVP Definition

The project is complete when the following work:

### Must have

- Responsive dashboard
- Working navigation
- Interactive Leaflet map
- Incident markers
- Incident filtering
- Route analysis
- Risk calculation
- Alternative routes
- Logistics table
- Vehicle map markers
- Alerts
- Demo data
- Vercel deployment

### Optional

- Gemini route explanation
- Incident creation
- More advanced analytics
- Weather API

---

# 22. Implementation Priority

Build in this order:

1. Project setup
2. Application shell
3. Dashboard
4. Local data files
5. Leaflet map
6. Incident markers
7. Route Intelligence
8. Risk calculation
9. Alternative routes
10. Incidents page
11. Logistics page
12. Alerts page
13. Responsive refinement
14. Loading/error states
15. Deployment
16. Optional Gemini integration

---

# 23. Final Principle

Path Setu is a **small, polished, functional mini project**.

Do not increase complexity just to make the technology stack look impressive.

The quality of the project should come from:

- Good UI
- Clear UX
- Working map
- Logical route-risk calculation
- Clean code
- Real interaction
- Good documentation

not from the number of technologies used.
