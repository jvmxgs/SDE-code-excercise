export default function (destinationStreetName, driverName) {
  const destinationLength = destinationStreetName.length;
  const driverLength = driverName.length;

  const vowels = driverName.match(/[aeiou]/gi);
  const consonants = driverName.match(/[bcdfghjklmnpqrstvwxyz]/gi);

  let baseSS;
  if (destinationLength % 2 === 0) {
    baseSS = (vowels ? vowels.length : 0) * 1.5;
  } else {
    baseSS = (consonants ? consonants.length : 0) * 1;
  }

  if (destinationLength !== 1 && driverLength !== 1) {
    const commonFactors = findCommonFactors(destinationLength, driverLength);
    if (commonFactors.length > 0) {
      baseSS *= 1.5;
    }
  }

  return baseSS;
}

function findCommonFactors(a, b) {
  const factorsA = findFactors(a);
  const factorsB = findFactors(b);

  return factorsA.filter(factor => factorsB.includes(factor));
}

function findFactors(number) {
  const factors = [];

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      factors.push(i);
      if (i !== number / i) {
        factors.push(number / i);
      }
    }
  }
  
  return factors;
}
