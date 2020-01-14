/**
PROJECT EULER PROBLEM 11 SOLUTION

This is a brute force solution that makes only
one optimization: since, WLOG, the right product
starting at arr[1][2] is the same as the left product
starting at arr[1][5], I only calculated the right, down,
down-left diagonal, and down-right diagonal products
starting at each cell. Once all of the possible products
are calculated, it is simply a matter of finding the maximum 
value of such products.
**/

const ADJACENT_NUM_COUNT = 4;

function largestGridProduct(arr) {
  let maxProduct = 0;
  for (let rowIdx = 0; rowIdx < arr.length; rowIdx++) {
    for (let colIdx = 0; colIdx < arr[rowIdx].length; colIdx++) {
      maxProduct = Math.max(maxProduct, getMaxStartingAtCoords(rowIdx, colIdx, arr));
    }
  }
  return maxProduct;
}

function getMaxStartingAtCoords(rowIdx, colIdx, arr) {
  return Math.max(
    getRightProduct(rowIdx, colIdx, arr),
    getDownProduct(rowIdx, colIdx, arr),
    getRightDiagonalProduct(rowIdx, colIdx, arr),
    getLeftDiagonalProduct(rowIdx, colIdx, arr)
  )
}

function getRightProduct(rowIdx, colIdx, arr) {
  if (arr[rowIdx].length - colIdx < ADJACENT_NUM_COUNT) {
    return 0;
  } else {
    let product = 1;
    for (let i = colIdx; i - colIdx < ADJACENT_NUM_COUNT; i++) {
      product *= arr[rowIdx][i];
    }
    return product;
  }
}

function getDownProduct(rowIdx, colIdx, arr) {
  if (arr.length - rowIdx < ADJACENT_NUM_COUNT) {
    return 0;
  } else {
    let product = 1;
    for (let i = rowIdx; i - rowIdx < ADJACENT_NUM_COUNT; i++) {
      product *= arr[i][colIdx];
    }
    return product;
  }
}

function getRightDiagonalProduct(rowIdx, colIdx, arr) {
  if ((arr.length - rowIdx < ADJACENT_NUM_COUNT) || (arr[rowIdx].length - colIdx < ADJACENT_NUM_COUNT)) {
    return 0;
  } else {
    let product = 1;
    let i = rowIdx;
    let j = colIdx;
    while ((i - rowIdx < ADJACENT_NUM_COUNT) && (j - colIdx < ADJACENT_NUM_COUNT)) {
      product *= arr[i][j];
      i++;
      j++;
    }
    return product;
  }
}

function getLeftDiagonalProduct(rowIdx, colIdx, arr) {
  if ((arr.length - rowIdx < ADJACENT_NUM_COUNT) || (colIdx < ADJACENT_NUM_COUNT)) {
    return 0;
  } else {
    let product = 1;
    let i = rowIdx;
    let j = colIdx;
    while ((i - rowIdx < ADJACENT_NUM_COUNT) && (colIdx - j < ADJACENT_NUM_COUNT)) {
      product *= arr[i][j];
      i++;
      j--;
    }
    return product;
  }
}
