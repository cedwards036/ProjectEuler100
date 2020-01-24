/**
PROJECT EULER PROBLEM 35 SOLUTION

This is pretty brute-force solution, and while I 
came up with a few techniques that I *thought* would
speed it up (including filtering the primes to only 
primes with no even digits at all), there was never 
a noticable impact in the actual execution time. This
algorithm generates primes using a standard sieve, then
loops through those primes, rotating each one to see if
its rotations are primes. It they are, it adds one to the
total and moves on.
**/

function circularPrimes(n) {
  const primes = generatePrimesUpTo(maxPossibleRotationValue(n));
  const primesUpToN = [...primes].filter(x => x < n);
  return primesUpToN.filter(prime => isCircular(prime, primes)).length;
}

function maxPossibleRotationValue(n) {
  return 10 ** Math.floor(Math.log10(n - 1) + 1)
}

function generatePrimesUpTo(n) {
  const primes = new Set([2]);
  const composites = setOfMultiplesOfTwoUpTo(n);
  for (let i = 3; i < n; i += 2) {
    if (!(composites.has(i))) {
      primes.add(i);
      let multipleOfI = i;
      while (multipleOfI <= n) {
        multipleOfI += 2 * i;
        composites.add(multipleOfI);
      }
    }
  }
  return primes;
};

function setOfMultiplesOfTwoUpTo(n) {
  const multiplesOfTwo = new Set();
  let curNum = 4;
  while (curNum <= n) {
    multiplesOfTwo.add(curNum);
    curNum += 2;
  }
  return multiplesOfTwo;
}

function isCircular(prime, primes) {
  const digitCount = getDigitCount(prime);
  let curRotation = prime;
  let isCircular = true;
  for (let _ = 0; _ < digitCount; _++) {
    curRotation = rotate(curRotation, digitCount);
    if (!primes.has(curRotation)) {
      isCircular = false;
    }
  }
  return isCircular;
}

function getDigitCount(num) {
  return Math.floor(Math.log10(num));
}

function rotate(num, digitCount) {
  return (num % 10) * 10 ** digitCount + Math.floor(num / 10);
}
