/**
 PROJECT EULER PROBLEM 28 SOLUTION

 This algorithm relies on the mathematical 
 properties of the spiral described in the
 problem statement. Specifically, it relies
 on the fact that the top righthand corner of 
 each spiral "layer" will always be equal to the
 square of the layer's side length (e.g. 9 for
 side length 3, 25 for side length 5, etc). The
 other diagonal values for a given layer can then
 be calculated as offsets of the upper right corner:

 upper right = layerNum^2
 lower right = layerNum^2 - (3 * (i - 1))
 lower left = layerNum^2 - (2 * i - 1))
 upper left = layerNum^2 - i + 1

 Adding all of these terms up and simplifying yields:

 (4 * layerNum^2) - 6 * (layerNum - 1)

 All that remains is to calculate that sum for each
 layer from 1 to n and totalling the results.
 **/

function spiralDiagonals(n) {
  let sum = 1;
  for (let i = 3; i <= n; i += 2) {
    sum += sumForCurrentSpiralLayer(i);
  }
  return sum;
}

function sumForCurrentSpiralLayer(layerNum) {
  return (4 * layerNum ** 2) - 6 * (layerNum - 1);
}
