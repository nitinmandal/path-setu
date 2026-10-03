# Frontend decisions

## Product frame

Path Setu is a dispatch-facing operational control surface for freight movement across North-East Indian corridors. The interface prioritizes an operator's next decision: inspect a disruption, calculate route risk, compare detours, then monitor the assigned shipment.

## UI system

- Kept the existing restrained light operations palette: slate surfaces, blue action colour, and semantic green/amber/red status colours. No decorative gradients or artificial dashboard embellishments were added.
- Consolidated repeated route headers into the `page-header` utility and established reusable surface and form-field styling in `src/index.css`.
- Retained compact square-edged components suitable for dense operational work rather than converting the app into a generic marketing dashboard.
- Replaced display-only hard-coded operational counts with values derived from the live incident, alert, route, and shipment state where that state is available.
- Clearly label sample visualizations and the dashboard telemetry state as demo data so the prototype does not imply live production measurements.
- Lazy-load route screens so less frequently used workspace views do not all contribute to the initial JavaScript request.

## Interaction and accessibility

- Added an application-wide visible keyboard focus indicator and disabled-button treatment.
- Made clickable route cards real buttons with selected state, and made selectable table rows keyboard operable.
- Improved the report-incident dialog with dialog semantics, labelled controls, a mobile-safe scroll region, and backdrop dismissal.
- Adjusted alert cards so acknowledgment controls remain usable without crowding content on narrow screens.

## Verification

- Production build is used as the primary source-level verification step.
- Browser-based visual automation was unavailable in this environment, so final browser viewport smoke testing should be run before external deployment.
