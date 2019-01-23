const xl = require('excel4node');
const helpers = require('./helpers');

// These are the categories of time that employees can log
// Array of objects allows for more flexibility with the data (i.e. shortnames etc)

function createAllWorkSheets(workbook) {

  //for each of the worksheets (i.e. numSheets), do the following:
  // cW ==> current Worksheet
  for (let cW = 1; cW < 12 + 1; cW++) {

    //add a worksheet
    // addSheet(workbook, cW);
    helpers.addSheet(workbook, cW);
    
    //add dates to each sheet
    // addDates(cW);
    helpers.addDates(cW);

    //add top-row categories
    // addCategories(cW);
    helpers.addCategories(cW);

    //add styles to sheet
    // addStyles(workbook, cW);
    helpers.addStyles(workbook,cW);

  }
}

module.exports = {createAllWorkSheets};