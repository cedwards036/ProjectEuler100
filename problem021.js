/*
PROJECT EULER PROBLEM 21 SOLUTION

This is pretty much a brute force algorithm with
some minor optimizations. It loops through all
integers from the first known amicable num (no 
reason to start earlier than that) until the limit,
checking their divisor sums to see if they are part
of an amicable pair. If they are, it adds the pair 
to the running sum total, and stores the larger of the
two amicable nums in a set so that it can be skipped 
later. 
*/

const FIRST_AMICABLE_NUM = 220;

function sumAmicableNum(n) {
  const knownAmicableNums = new Set();
  let amicableSum = 0;
  for (let i = FIRST_AMICABLE_NUM; i < n; i++) {
    if (!knownAmicableNums.has(i)) {
      let curDivisorSum = divisorSumOf(i);
      if ((curDivisorSum !== i) && (divisorSumOf(curDivisorSum) === i)) {
        knownAmicableNums.add(curDivisorSum);
        amicableSum += (i + curDivisorSum);
      }
    }
  }
  return amicableSum;
}

function divisorSumOf(n) {
  const sqrtN = Math.sqrt(n);
  let divisorSum = 1;
  for (let i = 2; i <= sqrtN; i++) {
    if (n % i === 0) {
      divisorSum += (i + n / i);
    }
  }
  return divisorSum;
}
