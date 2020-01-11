/**
PROJECT EULER PROBLEM 6 SOLUTION

This one seems almost too easy compared to the previous few.
My algorithm simply calculates the square of the sum of the 
first n integers using the well-known formula (n(n + 1)/2),
then subtracts the sum of the first n squares, which is
calculated via for loop. It is O(n), and very simple. 
**/

function sumSquareDifference(n) {
  return sumFirstNIntegersSquared(n) - sumFirstNSquares(n);
}

function sumFirstNIntegersSquared(n) {
  return (n * (n + 1) / 2) ** 2
}

function sumFirstNSquares(n) {
  var result = 1;
  for (let i = 2; i <= n; i++) {
    result += i ** 2;
  }
  return result;
}
