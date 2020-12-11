// const xl = require('excel4node'); //commented out bc not needed here I believe
const dateGen = require('./dateGenerator');
const helpers = require('./helpers');

// These are the categories of time that employees can log
// Array of objects allows for more flexibility with the data (i.e. shortnames etc)

// let firstDueDay = 26; //day of the month when timesheet for _first_ monthly pay period is due
let year = 2021;
// let numMonths = 12;

const payDates = [
  {
    full: 'January 15, 2021',
    short: 'January 15',
  },
  {
    full: 'January 30, 2021',
    short: 'January 30',
  },
  {
    full: 'February 14, 2021',
    short: 'February 14',
  },
  {
    full: 'February 28, 2021',
    short: 'February 28',
  },
  {
    full: 'March 13, 2021',
    short: 'March 13',
  },
  {
    full: 'March 30, 2021',
    short: 'March 30',
  },
  {
    full: 'April 15, 2021',
    short: 'April 15',
  },
  {
    full: 'April 30, 2021',
    short: 'April 30',
  },
  {
    full: 'May 15, 2021',
    short: 'May 15',
  },
  {
    full: 'May 29, 2021',
    short: 'May 29',
  },
  {
    full: 'June 15, 2021',
    short: 'June 15',
  },
  {
    full: 'June 30, 2021',
    short: 'June 30',
  },
  {
    full: 'July 15, 2021',
    short: 'July 15',
  },
  {
    full: 'July 30, 2021',
    short: 'July 30',
  },
  {
    full: 'August 14, 2021',
    short: 'Aug 14',
  },
  {
    full: 'August 28, 2021',
    short: 'Aug 28',
  },
  {
    full: 'September 15, 2021',
    short: 'Sep 15',
  },
  {
    full: 'September 30, 2021',
    short: 'Sep 30',
  },
  {
    full: 'October 15, 2021',
    short: 'Oct 15',
  },
  {
    full: 'October 30, 2021',
    short: 'Oct 30',
  },
  {
    full: 'November 13, 2021',
    short: 'Nov 13',
  },
  {
    full: 'November 30, 2021',
    short: 'Nov 30',
  },
  {
    full: 'December 15, 2021',
    short: 'Dec 15',
  },
  {
    full: 'December 30, 2021',
    short: 'Dec 30',
  },
  // 'Jan 15'
];

// Determines the number of sheets that need to be created in the workbook
const numSheets = payDates.length;

const payPeriods = dateGen.arrayOfDates(year, numSheets, payDates);
// console.log(datesArray);
// console.log(payPeriods);

function createAllWorkSheets(workbook) {
  //for each of the worksheets (i.e. numSheets), do the following:
  // cW ==> current Worksheet

  helpers.addEntrySheet(workbook);

  for (let cW = 1; cW < numSheets + 1; cW++) {
    //add a worksheet
    helpers.addSheet(workbook, cW, payDates);

    //add Sheet titles
    helpers.addSheetTitles(workbook, cW, payDates);

    // // //add dates to each sheet
    helpers.addDates(cW, payPeriods);

    // // //add top-row categories
    helpers.addCategories(cW, payPeriods);

    // Add formulas
    helpers.addFormulas(cW, payPeriods);

    // // //add styles to sheet
    helpers.addStyles(workbook, cW, payPeriods);

    helpers.addNameSignatureDate(workbook, cW, payPeriods);
  }
}

module.exports = { createAllWorkSheets };
