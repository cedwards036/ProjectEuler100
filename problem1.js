/**
PROJECT EULER PROBLEM 1 SOLUTION

This solution is more mathematical than algorithmic. It relies
on the fact that the sum of the first n multiples of x is equivalent
to the sum of integers from 1 to n times x. The sum of the integers 
from 1 to n is a well-known formula: n(n + 1)/2. From there it is just
a matter of adding the sum of three multiples with the sum of five
multiples, then subtracting the multiples of 15 (these have been 
double-added). The crossoverCount can be calculated by dividing the 
fiveMultiplesCount by 3 or by dividing the threeMultiplesCount
by 5. 
**/

function multiplesOf3and5(number) {
  const threeMultiplesCount = Math.floor((number - 1) / 3)
  const fiveMultiplesCount = Math.floor((number - 1) / 5)
  const crossoverCount = Math.floor(fiveMultiplesCount / 3)
  return sumOfOneToN(threeMultiplesCount) * 3 + sumOfOneToN(fiveMultiplesCount) * 5 - sumOfOneToN(crossoverCount) * 15
}

function sumOfOneToN(n) {
  return n * (n + 1) / 2
}
