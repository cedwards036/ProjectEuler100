/**
PROJECT EULER PROBLEM 22 SOLUTION

I found this one almost surprisingly straightforward,
so I instead challenged myself to implement the main
function in a single expression. The resulting "one-liner"
copies the input array, sorts that copy, then reduces the
array, summing the name scores of all elements. The actual 
name score calculation is basically a direct translation of
the problem instructions into code, and is implemented
as a helper method.
**/

function namesScores(arr) {
  return [...arr].sort().reduce((sum, name, idx) => {
    return sum += getNameScoreOf(name, idx + 1);
  }, 0);
}

function getNameScoreOf(name, position) {
  const ASCII_OFFSET = 64;
  let letterSum = 0;
  for (let i = 0; i < name.length; i++) {
    letterSum += name.charCodeAt(i) - ASCII_OFFSET;
  }
  return letterSum * position;
}
