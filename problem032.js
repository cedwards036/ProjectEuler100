/**
PROJECT EULER PROBLEM 32 SOLUTION

This algorithm depends on the assumption that pandigital products
can only come in two forms: x * xxxx = xxxx and xx * xxx = xxxx. It is 
impossible for two two-digit numbers or a one-digit and a three-digit 
number to multiply to a five digit number (99 * 99 < 10000, as is 9 * 999).
Similarly, 100 * 100 > 1000, 10 * 1000 > 1000, and 1 * 10000 > 1000, so it is 
impossible to get a three-digit number from multiplying any combination of the
remaining six digits. This algorithm checks all potential pandigital triplets 
by starting with the final product, then iterating through one- and two-digit
multiplicands, recording the current product in a set whenever a matching triplet
is found. The set guarantees uniqueness, so the same product is never counted twice.
For efficiency's sake, with both the four-digit product and the tow-digit multiplicand,
I use a non-repeating permutation generator rather than naively iterating through
integers. This guarantees that I never even check a number that could not 
*theoretically* be part of a pandigital triplet.
**/

function pandigitalProducts() {
  let knownPandigitalProducts = new Set();
  const productDigitPermutations = makePermutationsGenerator([0, 0, 0, 0], 0, 1, new Set());
  for (let productDigits of productDigitPermutations) {
    const product = digitArrToInt(productDigits);
    recordOneDigitMultiplicandPandigitals(knownPandigitalProducts, product, productDigits);
    recordTwoDigitMultiplicandPandigitals(knownPandigitalProducts, product, productDigits);
  }
  return sumNumericalSet(knownPandigitalProducts);
}

function* makePermutationsGenerator(numArr, startIdx, startNum, alreadyUsed) {
  if (startIdx === numArr.length) {
    yield numArr;
  } else {
    for (let i = 1; i <= 9; i++) {
      if (!alreadyUsed.has(i)) {
        numArr[startIdx] = i;
        const newAlreadyUsed = new Set(alreadyUsed)
        newAlreadyUsed.add(i);
        yield * makePermutationsGenerator(numArr, startIdx + 1, i + 1, newAlreadyUsed);
      }
    }
  }  
}

function recordOneDigitMultiplicandPandigitals(knownPandigitalProducts, product, productDigits) {
  // check equations like a * bcde = fghi
  for (let i = 2; i <= 9; i++) {
    if (canFormPandigital(i, [i], product, productDigits)) {
      knownPandigitalProducts.add(product);
    }
  }
}

function recordTwoDigitMultiplicandPandigitals(knownPandigitalProducts, product, productDigits) {
  // check equations like ab * cde = fghi
  const twoDigitPermutations = makePermutationsGenerator([0, 0], 0, 1, new Set());
  for (let twoDigits of twoDigitPermutations) {
    if (canFormPandigital(digitArrToInt(twoDigits), twoDigits, product, productDigits)) {
      knownPandigitalProducts.add(product);
    }
  }
}

function digitArrToInt(digitArr) {
  return digitArr.reduce((sum, x, idx) => {
    return sum += x * 10 ** (digitArr.length - (idx + 1));
  }, 0);
}

function canFormPandigital(multiplicand, multiplicandDigits, product, productDigits) {
  return (product % multiplicand === 0) && 
         isPandigital(multiplicandDigits, intToDigitArr(product / multiplicand), productDigits);
}

function intToDigitArr(int) {
  return int.toString().split('').map(x => parseInt(x));
}

function isPandigital(multiplicantDigits, multiplierDigits, productDigits) {
  const digitSet = new Set([...multiplicantDigits, ...multiplierDigits, ...productDigits])
  return digitSet.size === 9 && !digitSet.has(0);
}

function sumNumericalSet(numericalSet) {
  let sum = 0;
  for (let num of numericalSet) {
    sum += num;
  }
  return sum;
}
