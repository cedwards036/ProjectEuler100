/**
PROJECT EULER PROBLEM 19 SOLUTION

This problem doesn't require any sophisticated
mathematic or algorithmic techniques. It is more
an exercise in translating quirky and inconsistent
business rules to code. This particular solution
works by looping through every year between the first
known year (1900) and the lastYear of interest, keeping
track of the first weekday of each year and month along
the way. If the first weekday of a month is a sunday, and
the year in between firstYear and lastYear, the count is 
incremented.
**/

const SUNDAY = 0;
const MONDAY = 1;
const FIRST_KNOWN_YEAR = 1900;
const FIRST_KNOWN_WEEKDAY = MONDAY;
const DAYS_IN_A_WEEK = 7;

function countingSundays(firstYear, lastYear) {
  let count = 0;
  let curFirstWeekday = FIRST_KNOWN_WEEKDAY;
  for (let curYear = FIRST_KNOWN_YEAR; curYear <= lastYear; curYear++) {
    if (curYear >= firstYear) {
      count += countFirstSundaysInYear(curFirstWeekday, curYear);
    }
    curFirstWeekday = getFirstWeekdayOfNextYear(curFirstWeekday, curYear);
  }
  return count;
}

function countFirstSundaysInYear(firstWeekday, year) {
  const febDays = isLeapYear(year) ? 29 : 28;
  const monthLengths = [
    31, febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ]
  let count = 0;
  let curFirstWeekday = firstWeekday;
  for (let i = 0; i < monthLengths.length; i++) {
    if (curFirstWeekday === SUNDAY) {
      count++;
    }
    curFirstWeekday = (curFirstWeekday + monthLengths[i]) % DAYS_IN_A_WEEK;
  }
  return count;
}

function getFirstWeekdayOfNextYear(curFirstWeekday, curYear) {
  return (curFirstWeekday + (isLeapYear(curYear) ? 366 : 365)) % DAYS_IN_A_WEEK;
}

function isLeapYear(year) {
  return ((year % 4 === 0) && 
         (year % 100 !== 0)) ||
         (year % 400 === 0);
}
