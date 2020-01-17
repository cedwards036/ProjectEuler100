/**
PROJECT EULER PROBLEM 18 SOLUTION

This is another dynamic programming challenge. 
Starting at the bottom row of the triangle, we
incrementally calculate the max path sum starting at 
each element of each subsequent row. By the time we
hit the top row (consisting of a single element) we
have found the max path sum of the entire triangle. 
This is essentially O(n) time, if you take n to be
the number of elements in the input triangle. Much
more efficient than just testing every path individually.
**/

function maximumPathSumI(triangle) {
  const maxPaths = triangle[triangle.length - 1].slice();
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      const leftPathSum = triangle[i][j] + maxPaths[maxPaths.length - i - 2];
      const rightPathSum = triangle[i][j] + maxPaths[maxPaths.length - i - 1];
      maxPaths.push(Math.max(leftPathSum, rightPathSum));
    }
  }
  return maxPaths[maxPaths.length - 1];
}
