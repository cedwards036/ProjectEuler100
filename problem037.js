/**
PROBLEM 37 SOLUTION

This algorithm generates potential primes (using
the 6n +/- 1 rule to reduce the number of primes to
check), and checks each one for whether they are truncatable.
To make things even faster, the algorithm automatically
disqualifies any number with at least one even digit (other
than 2) without checking it--if a number has an even digit
then that digit will be in the one's place eventually, meaning
that at least one truncation is not prime and the number is not
truncatable. 
**/

function truncatablePrimes(n) {
  const knownPrimes = new Set([2]);
  const truncatablePrimes = [];
  const potentialPrimes = makePotentialPrimesGenerator();
  while (truncatablePrimes.length < n) {
    const curNum = potentialPrimes.next().value;
    if (isTruncatablePrime(curNum, knownPrimes)) {
        truncatablePrimes.push(curNum);
    }
  }
  return truncatablePrimes.reduce((sum, x) => sum += x, 0);
}

function* makePotentialPrimesGenerator() {
  let curNum = 11;
  let amtToAdd = 2;
  while (true) {
    yield curNum;
    curNum += amtToAdd;
    amtToAdd = (amtToAdd % 4 + 2);
  }
}

function isTruncatablePrime(num, knownPrimes) {
  if (hasEvenDigitsGreaterThanTwo(num)) {
    return false;
  } else {
    const digitCount = getDigitCount(num);
    let remainingDigitCount = digitCount;
    let curLeftNum = num;
    let curRightNum = num;
    while (remainingDigitCount >= 1) {
      if (!isPrime(curLeftNum, knownPrimes) || !isPrime(curRightNum, knownPrimes)) {
        return false;
      }
      curLeftNum = truncateLeft(curLeftNum);
      curRightNum = truncateRight(curRightNum);
      remainingDigitCount--;
    }
    return true;
  }
}

function truncateLeft(num) {
  const digitCount = getDigitCount(num);
  const leftMostDigit = nthDigit(digitCount - 1, num);
  return num - leftMostDigit * 10 ** (digitCount - 1);
}

function truncateRight(num) {
  return (num - (num % 10)) / 10;
}

function getDigitCount(num) {
  return Math.floor(Math.log10(num)) + 1;
}

function nthDigit(n, num) {
  return Math.floor((num % 10 ** (n + 1)) / 10 ** (n));
}

function hasEvenDigitsGreaterThanTwo(num) {
  const digitCount = getDigitCount(num);
  for (let i = 0; i < digitCount; i++) {
    const curDigit = nthDigit(i, num);
    if (curDigit % 2 === 0 && curDigit > 2) {
      return true;
    }
  }
  return false;
}

function isPrime(num, knownPrimes) {
  if (knownPrimes.has(num)) {
    return true;
  } else if ((num % 2 === 0) || (num === 1)) {
    return false;
  } else {
    const sqrtNum = Math.sqrt(num);
    for (let i = 3; i <= sqrtNum; i += 2) {
      if (num % i === 0) {
        return false;
      }
    }
    knownPrimes.add(num);
    return true;
  }
}
