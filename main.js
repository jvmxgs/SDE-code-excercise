import {
  hungarianAlgorithm,
  processShipmentsAndDrivers,
  assignDriverToUnassignedShipment
} from './src/calculations/index.js'

const shipmentsWithDrivers = processShipmentsAndDrivers();

const costMatrix = shipmentsWithDrivers.map(shipment => shipment.drivers.map(driver => driver.SS));

const invertedCostMatrix = costMatrix.map(costShipment => {
  const maxSS = Math.max(...costShipment)

  return costShipment.map(cost => {
    return parseFloat(maxSS) - parseFloat(cost) + 1
  })
})

const assignment = hungarianAlgorithm(invertedCostMatrix);

const unassignedShipmentIndices = assignment.filter(([row, col]) => row === -1).map(([row, col]) => col);

for (const unassignedShipmentIndex of unassignedShipmentIndices) {
  assignDriverToUnassignedShipment(shipmentsWithDrivers, assignment, unassignedShipmentIndex);
}

let output = [];
let totalSS = 0;

assignment.forEach(([row, col]) => {
  output.push({
    shipment: shipmentsWithDrivers[col].destinationStreet,
    driver: shipmentsWithDrivers[col].drivers[row].name,
    SS: shipmentsWithDrivers[col].drivers[row].SS
  });

  totalSS += shipmentsWithDrivers[col].drivers[row].SS
});


console.log({
  totalSS,
  output
})