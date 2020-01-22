/**
 PROJECT EULER PROBLEM 29 SOLUTION

 This is a very straightforward, naive
 solution, but I don't know if there is
 a better one. Simply calculate all the
 possible power combinations between a
 and b, and store each one in a set.
 Since sets enforce uniqueness, any 
 duplicates will not be added twice.
 Return the size of the set when you
 are done.
 **/

function distinctPowers(n) {
  const alreadySeenPowers = new Set();
  for (let i = 2; i <= n; i++) {
    for (let j = 2; j <= n; j++) {
      alreadySeenPowers.add(i ** j);
    }
  }
  return alreadySeenPowers.size;
}
