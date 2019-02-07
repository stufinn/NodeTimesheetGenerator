const xl = require('excel4node');
const dateGen = require('./dateGenerator');
const helpers = require('./helpers');

// These are the categories of time that employees can log
// Array of objects allows for more flexibility with the data (i.e. shortnames etc)

let firstDueDay = 26; //day of the month when timesheet for _first_ monthly pay period is due
let year = 2019;
let numMonths = 12;

const payDates = [
  'Jan 15',
  'Jan 30',
  'Feb 15',
  'Feb 28',
  'March 15',
  'March 29',
  'April 15',
  'April 30',
  'May 15',
  'May 30',
  'June 14',
  'June 28',
  'July 15',
  'July 30',
  'Aug 15',
  'Aug 30',
  'Sep 13',
  'Sep 30',
  'Oct 15',
  'Oct 30',
  'Nov 15',
  'Nov 29',
  'Dec 13',
  'Dec 30',
];

const numSheets = payDates.length;

const bothPayPeriods = dateGen.arrayOfDates(year, numMonths, firstDueDay);
// console.log(datesArray);

function createAllWorkSheets(workbook) {

  //for each of the worksheets (i.e. numSheets), do the following:
  // cW ==> current Worksheet

  helpers.addEntrySheet(workbook);

  for (let cW = 1; cW < numSheets + 1; cW++) {

    //add a worksheet
    helpers.addSheet(workbook, cW, payDates);

    //add Sheet titles
    // helpers.addSheetTitles(workbook, cW, bothPayPeriods);
    
    // // //add dates to each sheet
    // helpers.addDates(cW, bothPayPeriods);

    // // //add top-row categories
    // helpers.addCategories(cW, bothPayPeriods);

    // helpers.addFormulas(cW, bothPayPeriods);

    // // //add styles to sheet
    // helpers.addStyles(workbook,cW, bothPayPeriods);

    // helpers.addNameSignatureDate(workbook, cW, bothPayPeriods);

  }
}

module.exports = {createAllWorkSheets};