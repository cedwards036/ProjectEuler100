/**
PROJECT EULER PROBLEM 30 SOLUTION

The first thing I knew I had to solve when I saw this problem was: "how will my
algorithm know when to stop?" Many Project Euler problems tell you to "find
[insert math problem here] where n <= [some limit]. This problem just says "find
the sum of ALL numbers...etc." I eventually figured out that there is a point,
for every value of n, where the power sum of digits *cannot* possibly equal the 
original number. Specifically, when the maximum possible power sum for an
x-digit number  has at most x - 1 digits. For example, for n = 5, the maximum
possible number of digits that a "passing" number can have is 6. This is because
the power sum of 999,999 = 9^5 * 6 = 354,294 (a 6-digit number) but the power
sum of 9,999,999 = 9^5 * 7 = 413,343, *still* a 6-digit number. There is no way
for a 7-digit number or above can be equal to its digit power sum. I used this
logic to develop the getMAxDigitCount function.

The rest of the algorithm depends on the fact that the power sum of a group of
digits *does not depend on the order of the digits.* 1,634 has the same digit
power sum as 6,431--that power sum just happens to match 1,634 rather than 6,431. 
So, rather than checking every integer between 0 and the max possible value to 
see whether it power-sums to itself, we can check every *combination* 
(in the mathematical sense) of maxDigits digits to see whether they can be 
arranged into their power sum. This is much more efficient than checking the 
other way around. For n = 5, for example, it is the difference between checking
over 300,000 possible numbers and checking Cr(10, 6) = 5,005.
 **/

const MAX_SINGLE_DIGIT = 9;

function digitnPowers(n) {
  let resultSum = 0;
  const maxDigitCount = getMaxDigitCount(n);
  const combinations = makeCombinationsGenerator(new Array(maxDigitCount).fill(0), 0, 0);
  for (let combination of combinations) {
    const powerSum = getDigitPowerSum(combination, n);
    if (digitsCanFormNum(combination, powerSum)) {
      resultSum += powerSum;
    }
  }
  return resultSum - 1; // subtract one because 1 = 1^n should not be counted
}

function getMaxDigitCount(n) {
  const maxDigitPower = MAX_SINGLE_DIGIT ** n;
  let digitCount = 1;
  while (Math.log10((maxDigitPower) * digitCount) >= digitCount) {
    digitCount++;
  }
  return digitCount;
}

function* makeCombinationsGenerator(numArr, startIdx, startNum) {
  if (startIdx === numArr.length) {
    yield numArr;
  } else {
    for (let i = startNum; i <= MAX_SINGLE_DIGIT; i++) {
      numArr[startIdx] = i;
      yield * makeCombinationsGenerator(numArr, startIdx + 1, i);
    }
  }  
}

function getDigitPowerSum(digitArr, exp) {
  return digitArr.reduce((sum, digit) => {
    return sum += digit ** exp;
  }, 0);
}

function digitsCanFormNum(digits, num) {
  const sortedNonzeroInputDigits = digits.filter(x => x !== 0).sort();
  const sortedNonzeroNumDigits = numToDigitArr(num).filter(x => x !== 0).sort();
  return arraysAreEqual(sortedNonzeroInputDigits, sortedNonzeroNumDigits)
}

function numToDigitArr(num) {
  return num.toString().split('').map(x => parseInt(x));

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
