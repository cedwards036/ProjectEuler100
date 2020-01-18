/**
PROJECT EULER PROBLEM 24 SOLUTION

This one gave me even more trouble than the last,
and I unfortunately had to look up some descriptions
(but not code) of different lexicographic ordering 
algorithms as hints. This algorithm gets the "next"
permutation using the following steps: first, it finds
the rightmost number that is greater than its predecessor.
When the algorithm first starts up with a fully-sorted array,
this is simply the rightmost number in the array. Then, it
finds the number to the right of the starting number that is
closest to that number, i.e. the difference between number 1
and number 2 is minimal. Then, it swaps those two numbers in
the array, and uses an in-place quicksort to sort the portion
of the array to the right of the current starting num. Looping
this procedure will genereate permutations in lexicographic
order.
**/

function lexicographicPermutations(n) {
  let curPermutation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < n; i++) {
    curPermutation = nextPermutation(curPermutation);
  }
  return intArrToInt(curPermutation);
}

function nextPermutation(perm) {
  const lastIncreasingNumIdx = getLastIncreasingNumIdx(perm);
  const closestRightNumIdx = getClosestRightNumIdx(perm, lastIncreasingNumIdx);
  swap(perm, lastIncreasingNumIdx, closestRightNumIdx);
  quickSort(perm, lastIncreasingNumIdx + 1, perm.length - 1);
  return perm;
}

function getLastIncreasingNumIdx(perm) {
  for (let i = perm.length - 2; i >= 0; i--) {
    if (perm[i] < perm[i + 1]) {
      return i;
    }
  }
}

function getClosestRightNumIdx(perm, startingIdx) {
  let smallestDiff = Infinity;
  let smallestDiffIdx = 0;
  for (let i = startingIdx; i < perm.length; i++) {
    if (perm[i] > perm[startingIdx] && perm[i] - perm[startingIdx] < smallestDiff) {
      smallestDiff = perm[i] - perm[startingIdx];
      smallestDiffIdx = i;
    }
  }
  return smallestDiffIdx;
}

function swap(arr, idx1, idx2) {
  const temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

function quickSort(arr, low, high) {
  if (low < high) {
    const partition = makePartition(arr, low, high);
    quickSort(arr, low, partition - 1);
    quickSort(arr, partition + 1, high);
  }
  return arr;
}

function makePartition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
}

function intArrToInt(intArr) {
  let total = 0;
  for (let i = intArr.length - 1; i >= 0; i--) {
    total += intArr[i] * (10 ** (intArr.length - 1 - i));
  }
  return total;
}
