/**
PROJECT EULER PROBLEM 25 SOLUTION

What a breath of fresh air that was after
problem 24. This algorithm simply computes
fiboncci numbers using a simple iterative
method and stops once it computes one with the 
specified number of digits.
**/

function digitFibonacci(n) {
  let oneBefore = 1;
  let currentFib = 1;
  let fibIdx = 2;
  while (numberOfDigitsOf(currentFib) < n) {
    const temp = currentFib;
    currentFib += oneBefore;
    oneBefore = temp;
    fibIdx++;
  }
  return fibIdx;
}

function numberOfDigitsOf(n) {
  return Math.floor(Math.log10(n)) + 1;
}
