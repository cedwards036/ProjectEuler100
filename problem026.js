/**
PROJECT EULER PROBLEM 26 SOLUTION

This algorithm uses the standard manual long-
division algorithm to generate the decimal portion
of the fraction. The algorithm pays special attention
to the current remainder as it performs the divison:
if the remainder is ever 0, then the fraction does 
not yield a repeating decimal at all; if the remainder
ever repeats, then we have found the actual point
of repetition and can figure out the length. This
algorithm simply keeps track of the denominator
that yields the longest repeating decimal, and returns
it at the end.
**/

function reciprocalCycles(n) {
  let maxRepeatingLength = 0;
  let numWithMaxRepeatingLength = 0;
  for (let i = 1; i < n; i++) {
    const curRepeatingLength = getRepeatingLengthFor(i);
    if (curRepeatingLength > maxRepeatingLength) {
      maxRepeatingLength = curRepeatingLength;
      numWithMaxRepeatingLength = i;
    }
  }
  return numWithMaxRepeatingLength;
}

function getRepeatingLengthFor(denominator) {
  const previousRemainders = new Set();
  let repeatingLength = 0;
  let divisor = 1;
  let remainder = -1;
  while (remainder != 0) {
    let quotient = Math.floor(divisor / denominator);
    const remainder = divisor % denominator;
    if (previousRemainders.has(remainder)) {
      return repeatingLength;
    } else {
      previousRemainders.add(remainder);
      divisor = remainder * 10;
      repeatingLength++;
    }  
  }
  return 0;
}
