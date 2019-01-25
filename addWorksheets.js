const xl = require('excel4node');
const dateGen = require('./dateGenerator');
const helpers = require('./helpers');

// These are the categories of time that employees can log
// Array of objects allows for more flexibility with the data (i.e. shortnames etc)

let firstDueDay = 26; //day of the month when timesheet for _first_ monthly pay period is due
let year = 2019;
let numMonths = 2;

const bothPayPeriods = dateGen.arrayOfDates(year, numMonths, firstDueDay);
// console.log(datesArray);

function createAllWorkSheets(workbook) {

  //for each of the worksheets (i.e. numSheets), do the following:
  // cW ==> current Worksheet
  for (let cW = 1; cW < numMonths + 1; cW++) {

    //add a worksheet
    helpers.addSheet(workbook, cW, bothPayPeriods);
    
    // //add dates to each sheet
    helpers.addDates(cW, bothPayPeriods);

    // //add top-row categories
    // helpers.addCategories(cW);

    // //add styles to sheet
    // helpers.addStyles(workbook,cW, datesArray);

    // helpers.addFormulas(cW, datesArray);
  }
}

module.exports = {createAllWorkSheets};