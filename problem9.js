/**
PROJECT EULER PROBLEM 9 SOLUTION

This is a brute force solution that searches
the space of a's, b's, and c's that add up to
n for a pythagorean triplet. It returns with the
first one it finds.
**/

function specialPythagoreanTriplet(n) {
    for (let c = n; c > 1; c--) {
        let a = 1;
        let b = n - c - 1;
        while (b > (n - c - 1) / 2) {
            if (isPythagoreanTriplet(a, b, c)) {
                return a * b * c;
            }
            a++;
            b--;
        }
    }
    return true;
}

function isPythagoreanTriplet(a, b, c) {
    return (a ** 2 + b ** 2) == (c ** 2);
}
