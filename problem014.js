/**
PROJECT EULER PROBLEM 14 SOLUTION

This is a dynamic programming problem, plain and simple. 
Because Collatz sequences are recursively defined, we can
save previous results in a lookup hashtable. In this way,
every time the current Collatz sequence hits upon a number
we have already encountered, we can simply add *that* number's
sequence length to our currently tallied sequence length and be
done. All that remains is keeping track of the current max length
and the number that generated it, then returning that number
at the end.
**/

function longestCollatzSequence(limit) {
  let longestCollatzLength = 0;
  let startingNumWithLongestLength = 0;
  const knownCollatz = {1: 1};
  for (let i = 1; i < limit; i++) {
    const curCollatzLength = determineCollatzLength(i, knownCollatz)
    knownCollatz[i] = curCollatzLength;
    if (curCollatzLength > longestCollatzLength) {
      longestCollatzLength = curCollatzLength;
      startingNumWithLongestLength = i;
    }
  }
  return startingNumWithLongestLength;
}

function determineCollatzLength(n, knownCollatz) {
  let curCollatzLength = 0;
  let curNum = n;
  while (!(curNum in knownCollatz)) {
    curNum = nextCollatzNum(curNum);
    curCollatzLength++;
  }
  return curCollatzLength + knownCollatz[curNum];
}

function nextCollatzNum(n) {
  if (isEven(n)) {
    return n / 2;
  } else {
    return 3 * n + 1;
  }
}

function isEven(n) {
  return n % 2 === 0;
}
