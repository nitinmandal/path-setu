---
name: Tactical Field Light
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#4d556b'
  on-tertiary: '#ffffff'
  tertiary-container: '#656d84'
  on-tertiary-container: '#eef0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  body-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.375rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

The design system establishes a high-precision, tactical enterprise environment tailored for GIS logistics operations, telematics command dashboards, and real-time route intelligence. Designed for daylight mission control and operations hubs, the aesthetic strips away decorative ambiguity in favor of crisp utility, informational density, and rapid cognitive parsing.

The visual ethos blends **Technical Minimalism** with **Instrument-Grade Enterprise UI**:
- **Extreme Legibility**: High-contrast glyphs against neutral cool-slate foundations ensure readability under harsh lighting and glare conditions.
- **Data Density**: Compact vertical metrics and rigorous tabular structures prioritize operational throughput over decorative padding.
- **Architectural Clarity**: Hairline borders, discrete panel tiling, and clear status chromas replace heavy dropshadows or skeuomorphic styling.

## Colors

The palette is engineered for tactical situational awareness, distinguishing data layers, status conditions, and operational surfaces without color collision.

### Base & Structural Surfaces
- **Canvas Base (`#F8FAFC`)**: Background foundation for the viewport, layout shells, and overall workspace.
- **Surface Primary (`#FFFFFF`)**: Floating tool palettes, data grids, tactical cards, and analytical drawers.
- **Surface Muted / Secondary (`#F1F5F9`)**: Active toolstrip segments, table headers, coordinate bars, and telemetry strip backgrounds.
- **Surface Interactive / Hover (`#E2E8F0`)**: Row highlight states, pressed controls, and segmented tab tracks.

### Borders & Delimiters
- **Hairline Border (`#E2E8F0`)**: Standard interior divider for sub-panels and list elements.
- **Structural Border (`#CBD5E1`)**: Outer container frames, map HUD overlays, input strokes, and split panes.

### Text & Iconography Tiers
- **Text Heavy / Display (`#0F172A`)**: Primary data points, waypoints, telemetry headers, and key values.
- **Text Body / Standard (`#334155`)**: Field names, routing logs, vehicle descriptions, and standard labels.
- **Text Secondary / Technical (`#64748B`)**: Secondary metadata, inactive states, unit suffixes, and table column names.

### Brand & Interactive Accents
- **Operations Blue (`#2563EB`)**: Primary action triggers, selected routes, geofence anchors, and focal waypoints.
- **Telemetry Cyan (`#0284C7`)**: Secondary telemetry graphs, secondary selected paths, and active network connections.

### Operational Status Palette
Calibrated specifically for high-contrast visibility against light slate backgrounds:
- **Normal / Clear (`#16A34A`)**: Optimal transit, active fleet health, on-time schedules.
- **Caution / Diverging (`#D97706`)**: Minor transit delay, weather advisory, idle threshold exceeded.
- **At Risk / Degraded (`#EA580C`)**: Imminent ETA breach, perimeter divergence, sensor alert.
- **Critical / Intercept (`#DC2626`)**: Route blocked, critical vehicle failure, emergency beacon active.

## Typography

The typographic engine pairs **Geist** for clean, dense enterprise information hierarchy with **JetBrains Mono** for mission-critical telemetry, ISO-8601 timestamps, geospatial coordinates (`lat/long`), asset identification tags, and route waypoints.

- All numeric metrics, coordinates, vehicle plates, and time stamps must render in `JetBrains Mono` with tabular lining figures to maintain column-aligned readability across live-updating lists.
- Headers remain compact and tightly tracked to maximize screen real estate for map visualizers and multi-column telemetry tables.
- Monospace labels (`label-md` and `label-sm`) utilize slight letter spacing and uppercase formatting for swift tactical scanning of status headers and system tags.

## Layout & Spacing

The layout is built for high-density information architecture and spatial awareness dashboards:
- **Workspace Model**: A fluid multi-pane viewport model. The central canvas accommodates interactive map vector engines, bordered by collapsible tactical control drawers, telematics panels, and bottom incident timelines.
- **Density Grid**: A modular 4px baseline rhythm (`space-xs` = 4px, `space-sm` = 6px, `space-md` = 12px, `space-lg` = 16px, `space-xl` = 24px). Compact spacing rules allow 20–30% more data points on screen simultaneously compared to conventional consumer SaaS.
- **Adaptive Reflow**:
  - **Desktop (≥ 1280px)**: Persistent 3-column split view (Left: fleet filter/tree; Center: GIS map engine with floating overlay widgets; Right: selected asset route logs & telemetry).
  - **Tablet (768px - 1279px)**: Docked slide-over sidebars; map takes full underlying canvas.
  - **Mobile (< 768px)**: Stacked full-viewport modal sheets with bottom drawer toggles for route navigation.

## Elevation & Depth

Visual hierarchy is maintained through **tactile hairline borders** and **flat tonal layering** rather than dramatic drop shadows:
- **Ground / Map Plane (`z-0`)**: The core interactive geospatial map layer or primary grid surface.
- **HUD Layer (`z-10`)**: Surface containers (`#FFFFFF`) with a 1px solid stroke (`#CBD5E1`) and subtle ambient dispersion: `0 1px 2px rgba(15, 23, 42, 0.05)`.
- **Flyouts & Command Drawers (`z-20`)**: Structural panels overlaid on the map plane, bounded by a 1px border (`#CBD5E1`) and a low-diffusion depth shadow: `0 4px 12px -2px rgba(15, 23, 42, 0.08)`.
- **Modal Overlays & System Alerts (`z-30`)**: Raised inspection dialogs with `0 12px 24px -4px rgba(15, 23, 42, 0.12)`.

## Shapes

The design system employs **compact, disciplined soft corners (`roundedness: 1`)** reflecting military and technical hardware interfaces:
- Controls, text inputs, status chips, and button surfaces utilize `0.25rem` (4px) radii.
- Larger spatial cards, floating map toolbars, and contextual drawers use `0.375rem` to `0.5rem` (6px to 8px) radii maximum.
- Pill badges and rounded-full styles are strictly avoided, retaining a squared, purposeful aesthetic suited for dense GIS operational data.

## Components

### Buttons & Operational Triggers
- **Primary Action**: Solid `#2563EB` fill, white `#FFFFFF` text, `0.25rem` border radius, compact padding (`0.375rem 0.75rem`). Hover: `#1D4ED8`. Active: `#1E40AF`.
- **Secondary / Tactical**: Background `#FFFFFF`, 1px border `#CBD5E1`, text `#0F172A`. Hover: `#F1F5F9` and border `#94A3B8`.
- **Destructive / Abort**: Background `#DC2626`, text `#FFFFFF`. Hover: `#B91C1C`.
- **Utility / Icon Buttons**: Square-ratio (`32x32px`), `#FFFFFF` background, 1px `#CBD5E1` border, icon color `#334155`.

### Status Badges & Chips
- Crisp, non-diffused indicators with a tinted light background, sharp border, and bold status text:
  - **Normal**: Background `#DCFCE7`, border `#86EFAC`, text `#15803D`.
  - **Caution**: Background `#FEF3C7`, border `#FCD34D`, text `#B45309`.
  - **At Risk**: Background `#FFEDD5`, border `#FDBA74`, text `#C2410C`.
  - **Critical**: Background `#FEE2E2`, border `#FCA5A5`, text `#B91C1C`.
- Text renders in `JetBrains Mono` (`label-sm`), with an optional 6px circular solid dot glyph aligned leading.

### Input Fields & Filter Bars
- Height: 32px standard; 28px dense.
- Background: `#FFFFFF`. Border: 1px `#CBD5E1`. Corner radius: `0.25rem`.
- Text: `body-md` in `#0F172A`. Placeholder: `#94A3B8`.
- Focus state: 1px border `#2563EB` with an outline ring of `2px rgba(37, 99, 235, 0.15)`.

### Checkboxes & Segmented Controls
- **Checkboxes**: 14x14px square box, 1px `#CBD5E1` border, 2px radius. Checked state: `#2563EB` fill with crisp white vector check.
- **Segmented Control (Map Mode/Layer Switchers)**: Contained track `#F1F5F9` with 2px padding. Inactive tab: transparent background, text `#64748B`. Active tab: `#FFFFFF` fill with 1px hairline border `#CBD5E1` and text `#0F172A`.

### Tables & Data Grids
- **Header**: Height 32px, background `#F8FAFC`, border-bottom 1px `#CBD5E1`. Monospace text (`label-sm`) in `#64748B` with uppercase tracking.
- **Rows**: Alternating or single white background with hairline divider (`1px solid #E2E8F0`). Row height: 36px.
- **Hover / Selected Row**: Hover `#F8FAFC`; selected `#EFF6FF` with a 2px left border accent of `#2563EB`.

### Tactical Route & Telemetry Cards
- Framed in `#CBD5E1` with an interior fill of `#FFFFFF`.
- Header displays route code (e.g., `RT-9402`) in `code-md` bold, alongside an operational status badge.
- Telemetry rows organize pairs (Speed, Fuel, ETA, Lat/Long) in alternating 2-column key-value metrics with muted gray labels above dark bold values.