/**
PROJECT EULER PROBLEM 33 SOLUTION

This is essentially a brute force algorithm. It
checks every possible fraction with a value less than
one to see whether removing a common digit from the
numerator and denominator with "reduce" the fraction
to a true, equivalent reduction of the original
fraction. The algorithm will stop checking a pair
of numbers if it finds that (a) thay have no
digits in common, or (b) the only digit they have
in common is 0. As it runs, the algorithm keeps 
a running product of the four "passing" fractions,
then uses Euclid's gcd algorithm to reduce the denominator
and produce the final answer.
**/

function digitCancellingFractions() {
  let resultNumerator = 1;
  let resultDenominator = 1;
  for (let denominator = 11; denominator <= 99; denominator++) {
    let denomDigits = intToDigitArr(denominator);
    for (let numerator = 10; numerator < denominator; numerator++) {
      let numerDigits = intToDigitArr(numerator);
      const reducedNumerator = removeNonzeroIntInCommon(numerDigits, denomDigits);
      if (reducedNumerator.length === 1) {
        const reducedDenominator = removeNonzeroIntInCommon(denomDigits, numerDigits);
        const originalQuotient = numerator / denominator;
        const reducedQuotient = reducedNumerator[0] / reducedDenominator[0];
        if (originalQuotient === reducedQuotient) {
          resultDenominator *= reducedDenominator[0];
          resultNumerator *= reducedNumerator[0];
        }
      }
    }
  }
  return resultDenominator / gcd(resultNumerator, resultDenominator)
}

function intToDigitArr(int) {
  return int.toString().split('').map(x => parseInt(x));
} 

function removeNonzeroIntInCommon(arr, arrToCompare) {
  if (arrToCompare.includes(arr[0]) && arr[0] !== 0) {
    return [arr[1]];
  } else if (arrToCompare.includes(arr[1]) && arr[1] !== 0) {
    return [arr[0]];
  } else {
    return arr;
  }
}

function gcd(a, b) {
  if (a === b) {
    return a;
  } else if (a > b) {
    return gcd(a - b, b);
  } else {
    return gcd(a, b - a);
  }
}
