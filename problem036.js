/**
PROJECT EULER PROBLEM 36 SOLUTION

This algorithm uses a generator to iterate through all
base 2 palindromes in increasing order, checking each one to
see if its base-10 equivalent is a palindrome. If it is, it adds
the base 10 value to the running total. Once the base 10 value of
the current palindrome under examination crosses the range
threshhold, the algorithm returns the total. 
**/

function doubleBasePalindromes(n) {
  let resultSum = 0;
  const base2Palindromes = makePalindromeGenerator(2);
  let base10Value = 0;
  while (base10Value < n) {
    base10Value = digitArrToBase10Int(base2Palindromes.next().value, 2);
    if (isPalindrome(base10Value)) {
      resultSum += base10Value;
    }
  }
  return resultSum;
}

function* makePalindromeGenerator(base) {
  let curPalindrome = [0];
  while (true) {
    curPalindrome = nextPalindrome(curPalindrome, base);
    yield curPalindrome;
  }
}

function nextPalindrome(numArr, base) {
  const endIdx = Math.floor(numArr.length / 2);
  if (numArr.length % 2 === 0) {
    return recursiveNextPalindrome(numArr, endIdx - 1, endIdx, base);
  } else {
    return recursiveNextPalindrome(numArr, endIdx, endIdx, base);
  }
}

function recursiveNextPalindrome(numArr, startIdx, endIdx, base) {
  if (startIdx === endIdx) {
    numArr[startIdx]++;
  } else {
    numArr[startIdx]++;
    numArr[endIdx]++;
  }
  if (numArr[startIdx] === base) {
    numArr[startIdx] = 0;
    numArr[endIdx] = 0;
    if (endIdx === numArr.length - 1) {
      numArr[startIdx] = 1;
      numArr.push(1);
      return numArr;
    } else {
      return recursiveNextPalindrome(numArr, startIdx - 1, endIdx + 1, base)
    }
  } else {
    return numArr;
  }
}

function digitArrToBase10Int(digitArr, sourceBase) {
  return digitArr.reduce((sum, x, idx) => {
    return sum += x * sourceBase ** (digitArr.length - (idx + 1));
  }, 0);
}

function isPalindrome(num) {
  const digitCount = getDigitCount(num);
  for (let i = 0; i < digitCount; i++) {
    if (nthDigit(i, num) !== nthDigit(digitCount - i - 1, num)) {
      return false;
    }
  }
  return true;
}

function getDigitCount(num) {
  return Math.floor(Math.log10(num)) + 1;
}

function nthDigit(n, num) {
  return Math.floor((num % 10 ** (n + 1)) / 10 ** (n)) 
}
