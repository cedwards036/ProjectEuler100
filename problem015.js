/**
PROJECT EULER PROBLEM 15 SOLUTION

Another handy DP problem. This algorithm starts
at the end of the path (the bottom-most, right-most
corner), and gradually calculates how many paths exist
from each node in the grid to the goal. It saves each
result along the way so that subsequent path calculations
do not have to start from scratch--they merely need to
know how many paths exist between immediately reachable
nodes and the goal. 
**/

function latticePaths(gridSize) {
  const grid = makeGrid(gridSize + 1);
  grid[gridSize][gridSize] = 1;
  for (let i = gridSize; i >= 0; i--) {
    for (let j = gridSize; j >= 0; j--) {
      if (i < gridSize) {
        grid[i][j] += grid[i + 1][j];
      }
      if (j < gridSize) {
        grid[i][j] += grid[i][j + 1];
      }
    }
  }
  return grid[0][0];
}

function makeGrid(sideLength) {
  // Thanks to https://stackoverflow.com/a/46792350
  return Array.from(Array(sideLength), _ => Array(sideLength).fill(0));
}
