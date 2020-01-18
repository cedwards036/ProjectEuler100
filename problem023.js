/**
PROJECT EULER PROBLEM 23 SOLUTION

This one really gave me trouble. My final algorithm
works by looping through all numbers from 0 to n and
recording abundant numbers as it finds them. Also, 
for each number, it checks if that number can be written
as a sum of any two abundant numbers that it has already
seen. If not, it adds the current number to the sum.
**/

function sumOfNonAbundantNumbers(n) {
  let nonAbundantSum = 0;
  const knownAbundantNums = new Set();
  for (let i = 1; i <= n; i++) {
    if (isAbundant(i)) {
      knownAbundantNums.add(i);
    }
    if (!isAbundantSum(i, knownAbundantNums)) {
      nonAbundantSum += i;
    }
  }
  return nonAbundantSum;
}

function isAbundant(n) {
  return sumOfDivisors(n) > n;
}

function sumOfDivisors(n) {
  let sumOfDivisors = 1;
  const sqrtN = Math.sqrt(n);
  for (let i = 2; i <= sqrtN; i++) {
    if (n % i === 0) {
      sumOfDivisors += (i);
      if (i !== n / i) {
        sumOfDivisors += (n / i);
      }
    }
  }
  return sumOfDivisors;
}

function isAbundantSum(n, abundantLookup) {
  for (let i of abundantLookup) {
    if (abundantLookup.has(n - i)) {
      return true;
    }
  }
  return false;
}
