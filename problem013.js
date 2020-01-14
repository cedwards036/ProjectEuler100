/**
PROJECT EULER PROBLEM 13 SOLUTION

This is essentially a manual addition algorithm:
add all numbers occupying the same "place" (e.g. ones,
tens, etc), carry the digit overflow to the next place's
addition, and repeat. Once the algorithm knows that it is
calculating the last ten digits, it starts recording them
in an array. Once the main loop is done, any remaning carry
is added to the finalDigits array, and the final ten digits
of that array are then collected into a ten-digit int and
returned.
**/

const FINAL_DIGITS_COUNT = 10;
const RADIX = 10;

function largeSum(arr) {
  const finalDigits = [];
  let carry = 0;
  for (let i = arr[0].length - 1; i >= 0; i--) {
    const sum = sumNthPlace(i, carry, arr);
    const curDigit = sum % RADIX;
    carry = Math.floor(sum / RADIX);
    if (i < FINAL_DIGITS_COUNT) {
      finalDigits.push(curDigit);
    }
  }
  if (carry != 0) {
    finalDigits.push(carry);
  }
  return parseInt(finalDigits.reverse().join('').slice(0, FINAL_DIGITS_COUNT));
}

function sumNthPlace(n, carry, arr) {
  return arr.reduce((s, numStr) => s += parseInt(numStr[n]), 0) + carry;
}
