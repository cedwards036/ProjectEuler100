/**
PROJECT EULER PROBLEM 17 SOLUTION

This was the most complicated problem thusfar in
terms of the conditional logic involved. I think I spent 
at least as much time refactoring the below solution
to be comprehendable as I did solving the problem in
the first place. 

The basic idea is to loop through all the numbers from 1
to the limit, keeping a running total of the letter lengths
for each number. To calculate the letter length of a single
number, I use a series of hash maps to look up the correct
english word for each of the digits, keeping order of 
magnitude in mind. Making sure every edge case was
accounted for (including the teens and cases where
the hundreds or tens digits were 0) was the "hard" part
of this problem, but it was also the most fun.
**/

function numberLetterCounts(limit) {
  let total = 0;
  for (let i = 1; i <= limit; i++) {
    total += getLetterCountForEntireNum(i);
  }
  return total;
}

function getLetterCountForEntireNum(num) {
  const orderOfMagnitude = Math.floor(Math.log10(num));
  let totalLetterCount = getLengthContributionOfAnd(num);
  let curNum = num;
  for (let i = orderOfMagnitude; i >= 0; i--) {
    if (isTeen(curNum)) {
      totalLetterCount += getTeensLetterCount(curNum);
      return totalLetterCount;
    } else {
      const curDigit = Math.floor(curNum / (10 ** i));
      totalLetterCount += getDigitLetterCount(curDigit, i);
      curNum %= (10 ** i);
    }
  }
  return totalLetterCount;
}

function getDigitLetterCount(digit, orderOfMagnitude) {
  if (digit === 0) {
    return 0;
  } else {
    switch (orderOfMagnitude) {
      case 3:
        return getOnesDigitLetterCount(digit, 'thousand');
        break;
      case 2:
        return getOnesDigitLetterCount(digit, 'hundred');
        break;
      case 1:
        return getTensDigitLetterCount(digit);
        break;
      default:
        return getOnesDigitLetterCount(digit, '');;
    }
  }
}

function getTeensLetterCount(teenNum) {
  const teensToText = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
  ]
  return teensToText[teenNum - 10].length;
}

function getOnesDigitLetterCount(digit, placeDescription) {
  const singleDigitToText = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  return (singleDigitToText[digit - 1] + placeDescription).length
}

function getTensDigitLetterCount(digit) {
  const tensToText = [
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
  ];
  return tensToText[digit - 1].length
}

function isTeen(n) {
  return Math.floor(n / 10) === 1;
}

function getLengthContributionOfAnd(n) {
  if (numTextRequiresAnd(n)) {
    return 'and'.length;
  } else {
    return 0;
  }
}

function numTextRequiresAnd(n) {
  return n >= 100 && n % 100 !== 0;
}
