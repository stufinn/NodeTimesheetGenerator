const xl = require('excel4node');
const addWorkSheets = require('./addWorksheets');
const fs = require("fs");

// create a new instance of a Workbook class
var wb = new xl.Workbook();

// https://stackoverflow.com/questions/6645067/javascript-dynamically-creating-variables-for-loops

//modify it to accept the starting month and auto-generate all of the sheets

addWorkSheets.createAllWorkSheets(wb);

// Add date to file name

let currentDate = new Date();
let customDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}_${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;
let fileName = `./excelFiles/${customDate}.xlsx`;

// wb.write(`./excelFiles/${currentDate.toDateString()} ${currentDate.toTimeString()}.xlsx`);
wb.write(fileName);