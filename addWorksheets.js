const xl = require('excel4node');
const dateGen = require('./dateGenerator');
const helpers = require('./helpers');

// These are the categories of time that employees can log
// Array of objects allows for more flexibility with the data (i.e. shortnames etc)

let year = 2019;
let numMonths = 12;

const datesArray = dateGen.arrayOfDates(year,numMonths);
console.log(datesArray);

function createAllWorkSheets(workbook) {

  //for each of the worksheets (i.e. numSheets), do the following:
  // cW ==> current Worksheet
  for (let cW = 1; cW < numMonths + 1; cW++) {

    //add a worksheet
    helpers.addSheet(workbook, cW, datesArray);
    
    //add dates to each sheet
    helpers.addDates(cW, datesArray);

    //add top-row categories
    helpers.addCategories(cW);

    //add styles to sheet
    helpers.addStyles(workbook,cW);

    helpers.addFormulas(cW);
  }
}

module.exports = {createAllWorkSheets};