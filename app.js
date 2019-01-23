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

// Add date to file name
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// const monthNumbers = ['01','02', '03', '04','05','06','07','08','09','10','11'];

let currentDate = new Date();

wb.write(`./excelFiles/${currentDate.toDateString()} ${currentDate.toTimeString()}.xlsx`);