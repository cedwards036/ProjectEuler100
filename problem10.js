/**
PROJECT EULER PROBLEM 10 SOLUTION

I originally tried to solve this with a Sieve of Eratosthenes,
but freeCodeCamp's submission system timed out given the
n = 2,000,000 case. I think the issue was actually creating
the 2000000-element sieve, so I tried a nominally
less efficient, O(1) memory solution using the 6n +/- 1 
optimization for finding primes through brute force. This 
algorithm is still very slow, but was fast enough to be 
accepted by FCC's submission rules. 
**/

function primeSummation(n) {
  if (n < 3) {
    return 0;
  } else if (n === 3) {
    return 2;
  } else if (n < 6) {
    return 5;
  } else {
    return primeSummationGreaterThanFive(n);
  }
}

function primeSummationGreaterThanFive(n) {
  let primeSum = 5;
  let amtToAdd = 4;
  for (let i = 5; i < n; i += amtToAdd) {
    if (isPrime(i)) {
      primeSum += i;
    }
    amtToAdd = getNextAmtToAdd(amtToAdd);
  }
  return primeSum;
}

function isPrime(n) {
  let sqrtN = Math.sqrt(n);
  for (let i = 2; i <= sqrtN; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function getNextAmtToAdd(amtToAdd) {
  if (amtToAdd === 2) {
    return 4;
  } else {
    return 2;
  }
}
