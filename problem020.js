/**
PROJECT EULER PROBLEM 20 SOLUTION

This problem is extremely similar to problem 16,
with the added complication that *both* the 
multiplicand and the multiplier can have more 
than one digit. Luckily, this complication does
not require a significant change in strategy. I was
able to copy my solution code exactly from #16, and
then tweak it until it played nice with multi-digit
multipliers.
**/

function sumFactorialDigits(n) {
  let curMultiplier = n;
  let curProductDigits = [1];
  while (curMultiplier > 1) {
    curProductDigits = calculateNextFactorialStep(curProductDigits, curMultiplier);
    curMultiplier--;
  }
  return curProductDigits.reduce((sum, digit) => sum += digit);
}

function calculateNextFactorialStep(previousFactorialStep, multiplier) {
  let carry = 0;
  const nextFactorialStep = previousFactorialStep.map((digit) => {
    const digitProduct = multiplier * digit + carry;
    carry = Math.floor(digitProduct / 10);
    return digitProduct % 10;
  });

  if (carry !== 0) {
    nextFactorialStep.push(...numToDigitArray(carry));
  }
  return nextFactorialStep;
}

function numToDigitArray(num) {
  // thanks to https://stackoverflow.com/a/43573913
  return Array.from(num.toString()).map(Number).reverse();
}
