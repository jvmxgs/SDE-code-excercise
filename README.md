# Optimal Assignment of Drivers to Shipments

This repository contains a solution implemented in JavaScript to solve the problem of optimal assignment of drivers to shipments using the Hungarian algorithm. The solution seeks to assign each shipment to the driver with the highest SS (Service Score) available, guaranteeing that no driver is assigned to more than one shipment.

## How does it work

1. The data for shipments and their drivers is provided in an object structure.
2. The solution converts the SS values ​​to inverse costs to use the Hungarian algorithm.
3. The Hungarian algorithm is implemented to find the initial optimal allocation.
4. If there are shipments without an assigned driver, the driver with the highest available SS is assigned without repeating drivers.
5. The results are printed showing the assignment of drivers to shipments.

## How to use

1. Make sure you have [Node.js](https://nodejs.org/) installed on your system.
2. Clone this repository to your local machine.
3. Navigate to the repository folder and run `node main.js` to see the results of the mapping.

## Project Structure

- src/
  - calculations/
    - assign_driver_to_unassigned_shipment.js: Logic to assign a driver to an unassigned shipment.
    - calculate_suitability_score.js: Logic to calculate the suitability score.
    - hungarian_algorithm.js: Implementation of the Hungarian algorithm.
    - process_shipments_and_drivers.js: Processing of shipments and drivers.
- storage/
  - drivers.txt: Text file containing information about the drivers.
  - addresses.txt: Text file containing information about the shipment addresses.



