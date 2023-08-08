import fs from 'fs'
import { calculateSuitabilityScore } from './index.js'

const SHIPMENTS_FILE = './storage/addresses.txt';
const DRIVERS_FILE = './storage/drivers.txt';

export default function () {
  const shipments = fs.readFileSync(SHIPMENTS_FILE, 'utf-8').trim().split('\n');
  const drivers = fs.readFileSync(DRIVERS_FILE, 'utf-8').trim().split('\n');

  return shipments.map(destinationStreet => {
    const driversWithSS = drivers.map(driverName => ({
      name: driverName.trim(),
      SS: calculateSuitabilityScore(destinationStreet, driverName.trim()),
    }));

    return {
      destinationStreet,
      drivers: driversWithSS,
    };
  });
}