export default function (shipmentsWithDrivers, assignment, unassignedShipmentIndex) {
  const shipment = shipmentsWithDrivers[unassignedShipmentIndex];
  let maxSS = -Infinity;
  let maxDriverIndex = -1;

  for (let i = 0; i < shipment.drivers.length; i++) {
    if (!isDriverAssigned(assignment, i) && shipment.drivers[i].SS > maxSS) {
      maxSS = shipment.drivers[i].SS;
      maxDriverIndex = i;
    }
  }

  if (maxDriverIndex !== -1) {
    assignment[unassignedShipmentIndex] = [maxDriverIndex, unassignedShipmentIndex];
  }
}

function isDriverAssigned(assignment, driverIndex) {
  return assignment.some(([assignedRow]) => assignedRow === driverIndex);
}