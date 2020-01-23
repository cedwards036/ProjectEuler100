/**
PROJECT EULER PROBLEM 31 SOLUTION

This is a bottom-up dynamic programming algorithm that 
asks two questions for each combination of monetary amount
and coin denomination:

(1) How many ways can we make change for this amount *without*
    using any of the current denomination (specifically, only
    using *lower* denominations than the current one)?
(2) How many ways can we make change for this amount using 
    *at least one* of the current denomination?

Using a 2D dynamic programming lookup table, we can answer these
two questions very efficiently. The answer to the first question
is simply the value immediately to the left in the table. The 
answer to the second question is found in the same column as the
current value, but d columns above, d is the value of the current
coin denomination. In other words, for the second question, we are
thinking "ok, if we *know* we are using one of the current coin, all
we need to figure out is how to make change for the rest of the value."
For example, if the current value to make change for is 10 and the current
coin is worth 3, then the second question would be asking, "if we assume we 
are using a 3 coin, then all we really need to do is look up how to make change
for 10 - 3 = 7, using all coins up to and including the 3 coin. So we look
3 rows up on the table and find the value for 7 in the same column as our
current value. 

Once we have answered both questions, we add the answers together, record the 
result in our table, and continue on. Finally, we return the bottom-right-most
value in the table. 
**/

function coinSums(n) {
  const coins = [1, 2, 5, 10, 20, 50, 100, 200];
  const waysToMakeChange = makeNbyMTableOfZeros(n + 1, coins.length);
  fillFirstRowWithOnes(waysToMakeChange);
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < coins.length; j++) {
      waysToMakeChange[i][j] += waysWithCurrentCoin(waysToMakeChange, coins, i, j);
      waysToMakeChange[i][j] += waysWithoutCurrentCoin(waysToMakeChange, coins, i, j);
    }
  }
  return waysToMakeChange[n][coins.length - 1];
}

function makeNbyMTableOfZeros(n, m) {
  return Array(n).fill().map(() => Array(m).fill(0));
}

function fillFirstRowWithOnes(arr) {
  for (let i = 0; i < arr[0].length; i++) {
    arr[0][i] = 1;
  }
}

function waysWithCurrentCoin(changeTable, coins, rowIdx, colIdx) {
  if (rowIdx - coins[colIdx] >= 0) {
    return changeTable[rowIdx - coins[colIdx]][colIdx];
  } else {
    return 0;
  }
}

function waysWithoutCurrentCoin(changeTable, coins, rowIdx, colIdx) {
  if (colIdx - 1 >= 0) {
    return changeTable[rowIdx][colIdx - 1];
  } else {
    return 0;
  }
}
