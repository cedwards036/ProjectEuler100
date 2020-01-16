/**
PROJECT EULER PROBLEM 16 SOLUTION

Since 2^1000 is far to big to fit into a standard
32-bit int, we must track the current power of two's
digits manually, using an array. This algorithm 
performs the classic, manual multiplication algorithm
on an array of digits until the desired power of two
is achieved, then sums the digits of the final array. 
**/

function powerDigitSum(exponent) {
  let remainingMults = exponent - 1;
  let productDigits = [2];
  while (remainingMults > 0) {
    productDigits = calculateNextPowerOfTwo(productDigits);
    remainingMults--;
  }
  return productDigits.reduce((sum, digit) => sum += digit);
}

function calculateNextPowerOfTwo(previousPowerDigits) {
  let carry = 0;
  const nextPowerDigits = previousPowerDigits.map((digit) => {
    const digitProduct = 2 * digit + carry;
    carry = Math.floor(digitProduct / 10);
    return digitProduct % 10;
  });
  if (carry !== 0) {
    nextPowerDigits.push(carry);
  }
  return nextPowerDigits;
}
