/**
PROJECT EULER PROBLEM 5 SOLUTION

This solution derives from the following reasoning:
The smallest positive number evenly divisible by all 
numbers from 1 to n must be comprised of the minimum
set of prime factors that make up those numbers. How 
can we arrive at such a set? We can calculate how many
of each prime number "fits" between 1 and n.

For example, lets take the case where n = 20. How many 2's
must the solution contain as prime factors? Well, it must be
divisible by 16, which is 2^4, so there must be at least 4 2's. 
In fact, there must be *exactly* 4 2's, since 5 2's would imply
the presence of a 32 in the solution's factorization, and 32 is
not between 1 and 20. So, for every prime number x between 1 and n,
we take the log base x of n to find out how many copies of x will
"fit," store this info in a hash table I have called "factorCounts," 
and finally multiply the contents of that table together to get the
solution.

I think this algorithm executes in something like O(n^3/2) time. The 
most expensive part is building the factorCounts hash table, which 
consists of an outer for loop with n iterations and an inner for loop 
(in the isPrime function) with at most n^1/2 iterations.
**/

function smallestMult(n) {
  return multiplyFactorCounts(buildFactorCountsFromOneTo(n));
}

function buildFactorCountsFromOneTo(n) {
  const factorCounts = {};
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      factorCounts[i] = Math.floor(logWithBase(n, i));
    }
  }
  return factorCounts;
}

function isPrime(n) {
  const sqrtOfN = Math.sqrt(n);
  for (let i = 2; i <= sqrtOfN; i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

function logWithBase(x, y) {
  return Math.log(x) / Math.log(y);
}

function multiplyFactorCounts(factorCounts) {
  var total = 1;
  for (let key of Object.keys(factorCounts)) {
    total *= key ** factorCounts[key];
  }
  return total;
}
