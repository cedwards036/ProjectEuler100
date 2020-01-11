/**
PROJECT EULER PROBLEM 7 SOLUTION

This solution relies on the fact that all
primes greater than three are equal to 
6n - 1 or 6n + 1 for some positive integer
n. The algorithm is essentially a brute 
force algorithm that checks incrementally higher
integers for primality until it has found the
nth prime. Using the 6n +/- 1 rule simply allows
us to skip over several numbers during iteration. 
**/

function nthPrime(n) {
  if (n === 1) {
    return 2;
  } else if (n === 2) {
    return 3;
  } else {
    return nthPrimeGreaterThanThree(n);
  }
}

function nthPrimeGreaterThanThree(n) {
  var primeCount = 2;
  var mostRecentPrime = 3;
  var curNum = 5;
  var numToAdd = 2;
  while (primeCount < n) {
    if (isPrime(curNum)) {
      primeCount++;
      mostRecentPrime = curNum;
    }
    curNum += numToAdd;
    numToAdd = getNextNumToAdd(numToAdd);
  }
  return mostRecentPrime;
}

function isPrime(n) {
  var curNum = n;
  const sqrtN = Math.sqrt(n);
  for (let i = 2; i <= sqrtN; i++) {
    if (curNum % i === 0) {
      return false;
    }
  }
  return true;
}

function getNextNumToAdd(curNumToAdd) {
  if (curNumToAdd === 2) {
    return 4;
  } else {
    return 2;
  }
}
