/**
PROJECT EULER PROBLEM 4 SOLUTION

This is basically the naive solution to this problem and is *very*
inefficient--O(10^2n) I think, which would make it exponential time.
Simply check all possible products of two n-digit numbers, and return
the largest one that is a palindrome. It checks for palindromes by
converting the int to a string first, though this can also be done
via certain modulo operations on the original int. 
**/

function largestPalindromeProduct(n) {
  var result = 0;
  const minNum = 10 ** (n - 1);
  const maxNum = (10 ** n) - 1;
  for (let i = minNum; i <= maxNum; i++) {
    for (let j = i; j <= maxNum; j++) {
      const product = i * j;
      if (isPalindrome(product) && (product > result)) {
        result = product;
      }
    }
  } 
  return result;
}

function isPalindrome(num) {
  const strNum = num.toString();
  var i = 0;
  var j = strNum.length - 1;
  const strMidpoint = strNum.length / 2;
  while (i <= strMidpoint && j >= strMidpoint) {
    if (strNum[i] != strNum[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}
