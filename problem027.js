/**
 PROJECT EULER PROBLEM 27 SOLUTION

This one is a little more involved than the ones
surrounding it. My strategy was essentially brute force
with one main optimization. Since the problem stipulates
that the equations must generate consecutive primes
starting from 0, we know that the first such prime
must equal 0^2 + 0*a + b = b. Therefore, b must be prime 
in order for the equation to have *any* consecutive primes
starting at n = 0. We can therefore use a sieve to generate
primes, then loop through those primes to try values for b
instead of the pure brute force solution of looping through
all values < range for b. 

The one thing I am not comfortable with in this solution is
the line "const primes = generatePrimesUpTo(range * 2);". 
I know that only generating primes up to the range limit
is not sufficient input for the part of the algorithm that
checks if the equation is outputting primes. However,
I couldn't figure out a consistent, mathematically proven
upper limit to use. When I tried range * 2, it passed all
of the test cases, so I went with that. But I am not 
confident that it will work in *all* cases.
 **/
 
function quadraticPrimes(range) {
  let maxPrimeCount = 0;
  let maxA = 0;
  let maxB = 0;
  const primes = generatePrimesUpTo(range * 2);
  const bPrimes = [...primes].filter(x => x <= range);
  for (let a = -range + 1; a < range; a++) {
    bPrimes.forEach((b) => {
      let primeCount = getPrimeCountGivenConstants(a, b, primes);
      if (primeCount > maxPrimeCount) {
        maxPrimeCount = primeCount;
        maxA = a;
        maxB = b;
      }
    });
  }
  return maxA * maxB;
}

function generatePrimesUpTo(n) {
  const primes = new Set();
  const composites = new Set();
  for (let i = 2; i <= n; i++) {
    if (!(composites.has(i))) {
      primes.add(i);
      let multipleOfI = i;
      while (multipleOfI <= n) {
        multipleOfI += i;
        composites.add(multipleOfI);
      }
    }
  }
  return primes;
};

function getPrimeCountGivenConstants(a, b, primes) {
  let n = 0;
  while (primes.has(evaluateEquation(a, b, n))) {
    n++;
  }
  return n;
}

function evaluateEquation(a, b, n) {
  return n ** 2 + a * n + b;
}
