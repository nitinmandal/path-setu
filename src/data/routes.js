export const routeDatabase = [
  {
    id: "R-NH10-MAIN",
    name: "NH-10 Primary Mountain Transit",
    origin: "Siliguri",
    destination: "Gangtok",
    distanceKm: 114,
    estimatedTimeHours: 4.5,
    status: "High Risk / Disrupted",
    riskCategory: "High",
    baseRiskScore: 78,
    weatherRisk: 22,
    roadConditionRisk: 24,
    incidentExposure: 20,
    trafficRisk: 12,
    waypoints: [
      [26.727, 88.431], // Siliguri
      [26.892, 88.472], // Salugara
      [26.980, 88.470], // Coronation Bridge
      [27.050, 88.470], // Sevoke
      [27.140, 88.490], // Kalijhora
      [27.185, 88.512], // Teesta Stage III (Landslide Zone)
      [27.176, 88.530], // Melli
      [27.178, 88.590], // Rangpo
      [27.280, 88.595], // Singtam
      [27.300, 88.605], // Ranipool
      [27.330, 88.612]  // Gangtok
    ],
    primaryHazards: ["Active Landslide at Km 42", "Single Lane Slip Surface", "Riverside Erosion Risk"],
    recommendation: "Not Recommended for Heavy Axle Convoys. Reroute via Lava/Reshi."
  },
  {
    id: "R-ALT-LAVA",
    name: "Alternative Route A: Damdim – Lava – Reshi Corridor",
    origin: "Siliguri",
    destination: "Gangtok",
    distanceKm: 148,
    estimatedTimeHours: 5.8,
    status: "Operational / Recommended Bypass",
    riskCategory: "Moderate",
    baseRiskScore: 36,
    weatherRisk: 10,
    roadConditionRisk: 12,
    incidentExposure: 6,
    trafficRisk: 8,
    waypoints: [
      [26.727, 88.431], // Siliguri
      [26.850, 88.650], // Malbazar
      [26.910, 88.710], // Damdim
      [27.050, 88.660], // Gorubathan
      [27.085, 88.660], // Lava Pass
      [27.150, 88.670], // Pedong
      [27.198, 88.685], // Reshi Border
      [27.210, 88.660], // Rhenock
      [27.240, 88.600], // Pakyong
      [27.330, 88.612]  // Gangtok
    ],
    primaryHazards: ["Steep Hairpin Gradients", "High Fog Probability near Lava"],
    recommendation: "Recommended primary detour for critical supply trucks."
  },
  {
    id: "R-ALT-PAKYONG",
    name: "Alternative Route B: South Sikkim Namchi Bypass",
    origin: "Siliguri",
    destination: "Gangtok",
    distanceKm: 162,
    estimatedTimeHours: 6.2,
    status: "Operational",
    riskCategory: "Low",
    baseRiskScore: 24,
    weatherRisk: 6,
    roadConditionRisk: 8,
    incidentExposure: 4,
    trafficRisk: 6,
    waypoints: [
      [26.727, 88.431],
      [26.900, 88.350], // Bagrakote
      [27.030, 88.370], // Teesta Bazaar West
      [27.160, 88.360], // Namchi
      [27.230, 88.450], // Ravangla Junction
      [27.280, 88.595], // Singtam
      [27.330, 88.612]  // Gangtok
    ],
    primaryHazards: ["Extra Distance (+48 km)", "Slower Average Speeds"],
    recommendation: "Safest route for ultra-heavy machinery and hazardous goods."
  },
  {
    id: "R-NH27-SHILLONG",
    name: "NH-27 Guwahati to Shillong Expressway Corridor",
    origin: "Guwahati",
    destination: "Shillong",
    distanceKm: 98,
    estimatedTimeHours: 2.8,
    status: "Caution / Single Lane",
    riskCategory: "Moderate",
    baseRiskScore: 42,
    weatherRisk: 14,
    roadConditionRisk: 16,
    incidentExposure: 8,
    trafficRisk: 4,
    waypoints: [
      [26.180, 91.750], // Guwahati
      [26.112, 91.854], // Jorabat
      [25.930, 91.880], // Nongpoh
      [25.680, 91.900], // Umiam Lake
      [25.568, 91.883]  // Shillong
    ],
    primaryHazards: ["Pavement Shear at Km 118", "Morning Dense Mist"],
    recommendation: "Proceed with caution. Expect 20-min delay near Km 118."
  }
];
