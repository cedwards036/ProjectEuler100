/**
PROJECT EULER PROBLEM 34 SOLUTION

This problem is very similar to Problem 30, in that
you have to find sums of digits (in this case, factorials
of digits). You can therefore drastically improve performance
by dealing in combinations of digits rather than permutations:
the order of the digits does not matter as far as their sum is
concerned. The trick with this problem is that you cannot just
filter out the zeros the way you can with problem 30. 0! = 1 after
all, so the number of zeros you include in your sum matters! This 
slightly complicates the logic, but fundamentally this is a very
similar algorithm to problem 30. 
**/

const MAX_DIGITS = 7;

function digitFactorial() {
  let sum = 0;
  let numbers = [];
  const factorials = buildDigitFactorialLookup();
  const digitCombinations = makeCombinationsGenerator(zeroArrayOfSize(MAX_DIGITS), 0, 0);
  for (let digits of digitCombinations) {
    const digitsWithoutLeadingZeros = removeLeadingZeros(digits);
    const maxExtraZeros = digits.length - digitsWithoutLeadingZeros.length;
    for (let extraZeros = 0; extraZeros <= maxExtraZeros; extraZeros++) {
      const factorialSum = factorialSumFor(digitsWithoutLeadingZeros, factorials) + extraZeros;
      if (digitsCanFormNum(digitsWithoutLeadingZeros, factorialSum, extraZeros) && factorialSum > 2) {
        sum += factorialSum;
        numbers.push(factorialSum);
      }
    }
  }
  return {sum, numbers};
}

function buildDigitFactorialLookup() {
  const factorials = [1];
  for (let i = 1; i <= 9; i++) {
    factorials.push(i * factorials[i - 1])
  }
  return factorials;
}

function* makeCombinationsGenerator(numArr, startIdx, startNum) {
  if (startIdx === numArr.length) {
    yield numArr;
  } else {
    for (let i = startNum; i <= 9; i++) {
      numArr[startIdx] = i;
      yield * makeCombinationsGenerator(numArr, startIdx + 1, i);
    }
  }  
}

function zeroArrayOfSize(n) {
  return new Array(n).fill(0);
}

function removeLeadingZeros(digits) {
  let idx = 0;
  while (digits[idx] === 0 && idx < digits.length - 1) {
    idx++;
  } 
  return digits.slice(idx);
}

function factorialSumFor(digits, factorials) {
  return digits.reduce((sum, digit) => {
    return sum += factorials[digit];
  }, 0);
}

function digitsCanFormNum(digits, num, extraZeros) {
  const sortedInputDigits = zeroArrayOfSize(extraZeros).concat(digits.sort());
  const sortedNumDigits = intToDigitArr(num).sort();
  return arraysAreEqual(sortedInputDigits, sortedNumDigits)
}

function intToDigitArr(int) {
  return int.toString().split('').map(x => parseInt(x));
}

function arraysAreEqual(arr1, arr2) {
  if (arr1.length != arr2.length) {
    return false;
  } else {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
}

digitFactorial();
