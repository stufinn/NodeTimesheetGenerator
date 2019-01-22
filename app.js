const xl = require('excel4node');
const addWorkSheets = require('./addWorksheets');

var wb = new xl.Workbook();

  // https://stackoverflow.com/questions/6645067/javascript-dynamically-creating-variables-for-loops

//add all of the worksheets to X number
//passes in the excel workbook object
//modify it to accept the starting month and auto-generate all of the sheets

var sheetsToAdd = 12;
var startMonth = 0;

addWorkSheets.addAll(sheetsToAdd, wb, startMonth);

const currentDate = new Date();
// console.log(currentDate);
// console.log(currentDate.getMonth());


wb.write('./excelFiles/FirstTry.xlsx');