const xl = require('excel4node');
const dateGen = require('./dateGenerator');
const helpers = require('./helpers');

// These are the categories of time that employees can log
// Array of objects allows for more flexibility with the data (i.e. shortnames etc)

// let firstDueDay = 26; //day of the month when timesheet for _first_ monthly pay period is due
let year = 2019;
// let numMonths = 12;

const payDates = [
  {
    full: 'March 15, 2019',
    short: 'March 15'
  },
  {
    full:'March 29, 2019',
    short: 'March 29',
  },
  {
    full: 'April 15, 2019',
    short: 'April 15',
  },
  {
    full: 'April 30, 2019',
    short: 'April 30',
  },
  {
    full: 'May 15, 2019',
    short: 'May 15',
  },
  {
    full: 'May 30, 2019',
    short: 'May 30',
  },
  {
    full: 'June 14, 2019',
    short: 'June 14',
  },
  {
    full: 'June 28, 2019',
    short: 'June 28',
  },
  {
    full: 'July 15, 2019',
    short: 'July 15',
  },
  {
    full: 'July 30, 2019',
    short: 'July 30',
  },
  {
    full: 'August 15, 2019',
    short: 'Aug 15',
  },
  {
    full: 'August 30, 2019',
    short: 'Aug 30',
  },
  {
    full: 'September 13, 2019',
    short: 'Sep 13',
  },
  {
    full: 'September 30, 2019',
    short: 'Sep 30',
  },
  {
    full: 'October 15, 2019',
    short: 'Oct 15',
  },
  {
    full: 'October 30, 2019',
    short: 'Oct 30',
  },
  {
    full: 'November 15, 2019',
    short: 'Nov 15',
  },
  {
    full: 'November 29, 2019',
    short: 'Nov 29',
  },
  {
    full: 'December 13, 2019',
    short: 'Dec 13',
  },
  {
    full: 'December 30, 2019',
    short: 'Dec 30',
  }
  // 'Jan 15'
];

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
    helpers.addStyles(workbook,cW, payPeriods);

    helpers.addNameSignatureDate(workbook, cW, payPeriods);

  }
}

module.exports = {createAllWorkSheets};