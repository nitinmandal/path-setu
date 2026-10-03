# Frontend flow

1. **Operations Dashboard** (`/`) provides an at-a-glance overview of active hazards, route availability, shipments, a map preview, and demo-only trend charts.
2. **Live GIS Map** (`/map`) is the spatial investigation view. Operators can toggle layers, filter hazards, select incidents or vehicles, and open the incident inspection drawer.
3. **Incident Registry** (`/incidents`) supports searching and filtering incidents, opening their details, and reporting a new incident. A submitted report is added to the shared incident state and creates an unacknowledged alert.
4. **Route Intelligence** (`/route-intelligence`) accepts corridor and operating-condition inputs, computes a transparent risk score, and leads operators to alternatives.
5. **Alternative Routes** (`/alternative-routes`) compares viable corridors, previews the selected route on the map, then sends the operator to fleet monitoring to action the reroute.
6. **Logistics & Fleet** (`/logistics`) lets dispatch switch between shipments and vehicles, search either set, and simulate one safe local telemetry update for the demo.
7. **Alert Center** (`/alerts`) filters alerts and acknowledges individual or all outstanding items. Counts in the header and navigation update from the same shared alert state.

## Mobile behavior

- The primary sidebar becomes a dismissible drawer.
- Standard pages retain padded, vertically scrollable content; wide data tables stay horizontally scrollable within their own region.
- The map keeps its dedicated full-bleed layout, with the layer drawer collapsible and incident detail shown as an in-map overlay.
