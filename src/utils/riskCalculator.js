/**
 * Path Setu Transparent Rules-Based Route Risk Model
 * Formula: Risk Score = Weather Risk + Road Condition Risk + Incident Risk + Traffic Risk
 * Adjusted by vehicle weight class and cargo hazard modifier.
 */

export function calculateRouteRisk({
  weatherRisk = 10,
  roadConditionRisk = 15,
  incidentExposure = 10,
  trafficRisk = 5,
  vehicleType = "Light Convoy",
  cargoType = "General Supplies"
}) {
  // Vehicle multiplier
  let vehicleMultiplier = 1.0;
  if (vehicleType === "Heavy Freight Truck") vehicleMultiplier = 1.15;
  if (vehicleType === "Fuel Tanker") vehicleMultiplier = 1.25;
  if (vehicleType === "Emergency Medical Unit") vehicleMultiplier = 0.9;

  // Cargo multiplier
  let cargoMultiplier = 1.0;
  if (cargoType === "Vaccines & Critical Medical Supplies") cargoMultiplier = 1.1;
  if (cargoType === "Diesel & POL Products") cargoMultiplier = 1.3;

  const rawScore = (weatherRisk + roadConditionRisk + incidentExposure + trafficRisk) * vehicleMultiplier * cargoMultiplier;
  const totalScore = Math.min(100, Math.max(5, Math.round(rawScore)));

  let category = "Low";
  let statusColor = "green";
  if (totalScore > 30) { category = "Moderate"; statusColor = "amber"; }
  if (totalScore > 55) { category = "High"; statusColor = "orange"; }
  if (totalScore > 75) { category = "Critical"; statusColor = "red"; }

  return {
    score: totalScore,
    category,
    statusColor,
    breakdown: {
      weather: Math.round(weatherRisk * vehicleMultiplier),
      roadCondition: Math.round(roadConditionRisk * vehicleMultiplier),
      incidentExposure: Math.round(incidentExposure * vehicleMultiplier),
      traffic: Math.round(trafficRisk * vehicleMultiplier)
    },
    formulaText: `Risk Score (${totalScore}) = (Weather [${weatherRisk}] + Road [${roadConditionRisk}] + Incident [${incidentExposure}] + Traffic [${trafficRisk}]) × Vehicle Modifier [${vehicleMultiplier.toFixed(2)}] × Cargo Modifier [${cargoMultiplier.toFixed(2)}]`
  };
}
