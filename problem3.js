/**
PROJECT EULER PROBLEM 3 SOLUTION

This algorithm has three steps:
- Factor out all possible 2s from the given number.
- Check for any prime factors greater than two but
  less than sqrt(n). Since the loop in increasing,
  each new prime factor found will by default be the
  largest prime factor we know about.
- Finally, after you have factored out all primes less 
  than sqrt(n), if the remaning number is itself a prime
  greater than 2, then that remaining number must be 
  the greatest prime factor. Otherwise, if the remaning 
  number is 1, then the largest previously-found prime
  factor should be returned. 
**/

function largestPrimeFactor(number) {
  var largestPrimeFactor = 2;
  var curNum = factorOutTwosFrom(number);
  for (let i = 3; i <= Math.sqrt(curNum); i += 2) {
    while (nDividesM(i, curNum)) {
      curNum /= i;
      largestPrimeFactor = i;
    }
  }
  if (curNum > 2) {
    largestPrimeFactor = curNum;
  }
  return largestPrimeFactor;
}

function factorOutTwosFrom(num) {
  while (nDividesM(2, num)) {
      num /= 2;
    } 
  return num;
}

function nDividesM(n, m) {
  return m % n === 0;
}
