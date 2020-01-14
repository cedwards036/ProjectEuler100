/**
PROJECT EULER PROBLEM 12 SOLUTION

This was another conceptually straightforward problem,
so I used it as an excuse to practice javascript array 
filtering and generators. A generator continuously
serves up triangular numbers while a helper method checks 
how many divisors the current number has. Once the threshold
has been reached, the method returns the current number.
**/

function divisibleTriangleNumber(n) { 
  const triangularNumbers = makeTriangleNumberIterator(); 
  while (true) { 
    let curNum = triangularNumbers.next().value;
    if (numberOfDivisorsOf(curNum) > n) {
      return curNum;
    }
  } 
} 

function* makeTriangleNumberIterator() {
  let i = 1; 
  let total = 1; 
  while (true) { 
    yield total; i++; 
    total += i; 
  }
} 

function numberOfDivisorsOf(n) {
  return range(1, Math.sqrt(n))
    .filter((x) => n % x === 0)
    .length * 2; 
} 

function range(start, end) {
  let result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
