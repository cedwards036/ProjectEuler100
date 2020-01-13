/**
PROJECT EULER PROBLEM 2 SOLUTION

This solution uses a dynamic programming approach to 
calculating the fibonacci numbers. The algorithm is
straightforward enough: calculate the first n fibonacci
numbers; if the current one happens to be even, add it 
to the total; finally, return the total. 
**/

function fiboEvenSum(n) {
  const fibStorage = [1, 2];
  var total = 2;
  for (let i = 2; i < n; i++) {
    fibStorage[i] = fibStorage[i - 1] + fibStorage[i - 2];
    if (isEven(fibStorage[i])) {
      total += fibStorage[i];
    }
  }
  console.log(total);
  return total;
}

function isEven(n) {
  return n % 2 === 0;
}
