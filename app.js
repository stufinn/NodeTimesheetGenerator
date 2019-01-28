const xl = require('excel4node');
const addWorkSheets = require('./addWorksheets');
const fs = require("fs");

var wb = new xl.Workbook();

// https://stackoverflow.com/questions/6645067/javascript-dynamically-creating-variables-for-loops

//modify it to accept the starting month and auto-generate all of the sheets

addWorkSheets.createAllWorkSheets(wb);

// Add date to file name
// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const monthNumbers = ['01','02', '03', '04','05','06','07','08','09','10','11'];

let currentDate = new Date();
let customDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}_${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;
let fileName = `./excelFiles/${customDate}.xlsx`;

// wb.write(`./excelFiles/${currentDate.toDateString()} ${currentDate.toTimeString()}.xlsx`);
wb.write(fileName);