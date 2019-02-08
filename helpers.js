const xl = require('excel4node');
// const dateGen = require('./dateGenerator');

// variables to assign where the top left hand corner of the table should occur
const startingRow = 2;
const startingColumn = 1;
//start second table X rows below first
const tableGap = 11;

let worksheet = [];

const categories = [

  {
    name: 'Regular',
    short: 'Regular',
    type: 'userEntered'

  },
  {
    name: 'Progr./Proj.',
    short: 'ProgrProj',
    type: 'userEntered'
  },
  {
    name: 'Sick',
    short: 'Sick',
    type: 'userEntered'
  },
  {
    name: 'Vacation',
    short: 'Vacay',
    type: 'userEntered'
  },
  {
    name: 'Banked',
    short: 'Bank',
    type: 'userEntered'
  },
  {
    name: 'Stat',
    short: 'Stat',
    type: 'userEntered'
  },
  {
  name: '[custom]',
  short: '[custom1]',
  type: 'userEntered'
  },
  {
    name: '[custom]',
    short: '[custom2]',
    type: 'userEntered'
  },
  {
    name: '[custom]',
    short: '[custom3]',
    type: 'userEntered'
  },
  {
    name: '[custom]',
    short: '[custom4]',
    type: 'userEntered'
  }, 
  {
    name: '[custom]',
    short: '[custom5]',
    type: 'userEntered'
  },
  {
    name: '[custom]',
    short: '[custom5]',
    type: 'userEntered'
  },
  {
    name: '[custom]',
    short: '[custom5]',
    type: 'userEntered'
  },{
    name: '[custom]',
    short: '[custom5]',
    type: 'userEntered'
  },
  {
    name: '[custom]',
    short: '[custom]',
    type: 'userEntered'
  },
  {
    name: '[custom]',
    short: '[custom5]',
    type: 'userEntered'
  }
];

var worksheetOptions = {
  'headerFooter': {
    // 'firstHeader': 'This is the header',
    'evenHeader': '&20Shibogama First Nations Council Semi Monthly Timesheet',
    'oddHeader': '&20Shibogama First Nations Council Semi Monthly Timesheet'
  },
  pageSetup: {
    'fitToHeight': 1,
    'fitToWidth': 1,
    'orientation': 'landscape',
  },
  printOptions: {
    'centerHorizontal': true,
    'centerVertical': true,
  }
}

// ADD and style "entry" sheet

const addEntrySheet = (workbook) => {

  //assign the first worksheet this variable name
  var entrySheet = workbook.addWorksheet(`Start Here`, worksheetOptions);

  addCategToEntry(entrySheet);

};

//Add the categories to the entry sheet
// Parameter => the entry sheet itself

const addCategToEntry = (entrySheet) => {
  entrySheet.cell(1,2)
    .string('Timesheet Categories');

  for (let x = 1; x <= categories.length; x++) {
    //add categories to the entry sheet
    // don't include the first and last entries (i.e. date and total 'categories')
      entrySheet.cell(x + 1, 2)
      .string(`${categories[x-1].name}`);
  }
}


const addSheet = (workbook, cW, payDates) => {

  worksheet[cW] = workbook.addWorksheet(`${payDates[cW-1]}`, worksheetOptions);
};

// Add the title above each of the charts
const addSheetTitles = (workbook, cW, payDates) => {

  let tableTitleStyle = workbook.createStyle({
    alignment: {
      horizontal: 'center'
    },
    font: {
      bold: true,
      size: 20
    }
  });
  
  function addTitle(titleRow, title) {
    worksheet[cW].cell(titleRow, startingColumn, titleRow, startingColumn + categories.length + 1, true)
    .string(`${title}`)
    .style(tableTitleStyle);
  }

  addTitle(startingRow - 1, `Pay Date: ${payDates[cW-1]}`);
  // addTitle(startingRow + bothPayPeriods[cW-1].payPeriod1.length + tableGap - 2, `Second Semi-Monthly Pay Period (${bothPayPeriods[cW-1].name})` )
}

// Add dates to tables

const addDates = (cW, payDates) => {

  let dates = payDates[cW-1].dates;

  //insert dates 
  for (let i = 0; i < dates.length; i++) {
    worksheet[cW].cell( (startingRow+1) + i, startingColumn)
      .string(`${dates[i]}`);
  }
  //insert Total below dates
  worksheet[cW].cell( (startingRow + dates.length + 1), startingColumn )
    .string('Total');
};


//Add the categories to the tables

const addCategories = (cW, bothPayPeriods) => {

  //add 'date' title
  worksheet[cW].cell(startingRow, startingColumn)
    .string('Date');

//add "total" title
  worksheet[cW].cell(startingRow, startingColumn + categories.length + 1)
  .string('Total');

  let startList = 2;

  for (let x = 0; x < categories.length; x++) {
    
    // add categories 
    worksheet[cW].cell(startingRow, startingColumn + 1 + x)
      .formula(`='Start Here'!B${startList}`);
    
    startList += 1;
  }  
      
};


//Add formulas to the tables

const addFormulas = (cW, payPeriods) => {
  // Total (per day)
  let payPeriod = payPeriods[cW-1].dates;

  let daysTotalsCol = startingColumn + categories.length + 1;
  let startRow = startingRow + 1;
  // let startRow2 = startingRow + payPer1.length + tableGap; //check value

  function dateTotals(cW, startRow, daysTotalsCol, numCells) {
    for (let m = 0; m < numCells; m++) {
      let firstDaysTotCell = xl.getExcelCellRef(startRow + m, startingColumn + 1 );
      let lastDaysTotCell = xl.getExcelCellRef(startRow + m, daysTotalsCol - 1 );
      worksheet[cW].cell(startRow + m, daysTotalsCol)
      .formula(`SUM(${firstDaysTotCell}:${lastDaysTotCell})`);
    }
   }
   
  function categoryTotals(cW, startCatRow, startCol, categTotRow, numCategories){
  
    for (let n = 0; n < numCategories + 2; n++) {
      let firstCategTotCell = xl.getExcelCellRef(startCatRow + 1, startCol + n);
      let lastCategTotCell = xl.getExcelCellRef(categTotRow - 1, startCol + n);
      worksheet[cW].cell(categTotRow, startCol + n)
      .formula(`SUM(${firstCategTotCell}:${lastCategTotCell})`);
    }
  }

  // Add totals
  dateTotals(cW, startRow, daysTotalsCol, payPeriod.length);

  // Total (per category)
  let startCategoryTotCol = startingColumn + 1;
  let startCatRow = startingRow;
  let categTotRow = startingRow + payPeriod.length + 1;
  let numOfCategories = categories.length - 1; //don't include 'totals' category

  // Add category totals
  categoryTotals(cW, startCatRow, startCategoryTotCol, categTotRow, numOfCategories);

};

// ------------ ADD STYLES --------------

const addStyles = (workbook,cW, payPeriods) => {

  let payPeriod = payPeriods[cW-1].dates;
  // let pay_Per2 = bothPayPeriods[cW-1].payPeriod2;
  // let startingRow2 = startingRow + payPeriod.length + tableGap - 1;

  // Define worksheet styles
  var titleStyle = workbook.createStyle({
    font: {
      size: 12,
      bold: true
    },
    border: {
      top: {
        style: 'thin'
      },
      right: {
        style: 'thin'
      },
      bottom: {
        style: 'thin'
      },
      left: {
        style: 'thin'
      }
    }
  });

  var categoryStyle = workbook.createStyle({
    alignment: {
      textRotation: 45,
    }
  })

  var coreCellStyle = workbook.createStyle({
    border: {
      top: {
        style: 'dotted'
      },
      right: {
        style: 'dotted'
      },
      bottom: {
        style: 'dotted'
      },
      left: {
        style: 'dotted'
      }
    }
  });

  var centerStyle = workbook.createStyle({
    alignment: {
      horizontal: 'center'
    }
  });

  var rightStyle = workbook.createStyle({
    alignment: {
      horizontal: 'right'
    }
  });

  var noLeftBorder = workbook.createStyle({
    border: {
      left: {
        style: 'none'
      }
    }
  });

  var blueFillStyle = workbook.createStyle({
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#0000ff'
    }
  });

  var bottomTotalsStyle = workbook.createStyle({
    font: {
      bold: true
    },
    border: {
      top: {
        style: 'double'
      },
      left: {
        style: 'dotted'
      }
    }
  });

  var daysTotalStyle = workbook.createStyle({
    font: {
      bold: true
    },
    border: {
      left: {
        style: 'double'
      },
      right: {
        style: 'thin'
      },
      top: {
        style: 'dotted'
      }

    }
  });
  
  var dateStyle = workbook.createStyle({
    alignment: {
      horizontal: 'right'
    }
  });

  var lightfill = workbook.createStyle({
      fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: 'F2F2F2'
    }
  });

  var darkfill = workbook.createStyle({
    fill: {
      type: 'pattern',
      patternType: 'solid',
      fgColor: 'D9D9D9'
    }
  });

  // fill: {
  //   type: 'pattern',
  //   patternType: 'solid',
  //   color: '#lightgray'
  // }

  //  -- end of define styles -- //

  // ----- Add styling to Categories row AND bottom totals row --- //

  function styleCategories(cW, firstRow, firstCol, j) {
    worksheet[cW].row(firstRow).setHeight(50);
    worksheet[cW].cell(firstRow, firstCol + j)
    .style(titleStyle)
    .style(centerStyle)
    .style(categoryStyle);
  }

  function styleCategoryTots(cw, catTotRow, catTotStartCol, j) {
    worksheet[cW].cell(catTotRow, catTotStartCol + j)
    .style(bottomTotalsStyle)
    .style(centerStyle);
  }

  // ----  Add title styles and Category Total Styles ------ //
  for (let j = 0; j < categories.length + 2; j++) {
    //style title row at top
    styleCategories(cW, startingRow, startingColumn, j);
    // styleCategories(bothPayPeriods, cW, startingRow2, startingColumn, j)

    // style category-totals row for first table
    let catTotRow1 = startingRow + payPeriod.length + 1;
    styleCategoryTots(cW, catTotRow1, startingColumn, j );
   
    // style category-totals row for second table
    // let catTotRow2 = catTotRow1 + pay_Per2.length + tableGap - 1;
    // styleCategoryTots(bothPayPeriods, cW, catTotRow2, startingColumn, j );

  }


  // ----- Add Core Cell Styling ---- //

  function styleCoreCells(cW, dates, coreRowStart) {
    for (let k = 0; k < categories.length; k++) {
      worksheet[cW].column(startingColumn + 1 + k).setWidth(6); //set width for only core cell columns
      for (l = 0; l < dates.length; l++) {
        
        //Add light gray color to every other column
        if (k % 2 == 0) {
          worksheet[cW].cell( (coreRowStart + l), (startingColumn + 1) + k)
            .style(lightfill);
        }
        // if string in the date cell of the column includes "Sat" or "Sun", color the row 'darker' shade of light-gray
        if (dates[l].includes("Sat") || dates[l].includes("Sun")) {
          worksheet[cW].cell( (coreRowStart + l), (startingColumn + 1) + k)
            .style(darkfill);
        }
        //format cells
        worksheet[cW].cell( (coreRowStart + l), (startingColumn + 1) + k)
          .style(coreCellStyle)
          .style(centerStyle);

      }
    }
  }

  let coreRowStart1 = startingRow + 1;
  //add styling to core cells for first table
  styleCoreCells(cW, payPeriod, startingRow + 1);
  //add styling to core cells for first table
  // styleCoreCells(cW, pay_Per2, startingRow + payPeriod.length + tableGap);

    //add Styling to dates column AND dates total column

  function styleDatesColumn(cW, numDates, initRow) {
    for (let i = 0; i < numDates; i++) {
      worksheet[cW].cell(initRow + i, startingColumn)
      .style(titleStyle)
      .style(dateStyle);
    }
    //style bottom "total" title
    worksheet[cW].cell( (initRow + numDates), startingColumn)
      .style(rightStyle)
      .style(noLeftBorder);
  }

  function styleDateTotalsColumn(cW, numDates, initRow, totColLoc) {
    for (let p = 0; p < numDates; p++) {
      worksheet[cW].cell(initRow + p, totColLoc)
        .style(daysTotalStyle)
        .style(centerStyle);
    }
  }

  let initRow = startingRow + 1;
  // let initRow2 = startingRow + payPeriod.length + tableGap;
  let totColLoc = startingColumn + categories.length + 1;
  let numDates = payPeriod.length;
  // let numDates2 = pay_Per2.length;

  worksheet[cW].column(startingColumn).setWidth(18); //keep this here
  // Style dates and dates-total columns for first table
  styleDatesColumn(cW, numDates, initRow);
  styleDateTotalsColumn(cW, numDates, initRow, totColLoc);
  // Style dates and dates-total columns for second table
  // styleDatesColumn(cW, numDates2, initRow2);
  // styleDateTotalsColumn(cW, numDates2, initRow2, totColLoc);
};

function addNameSignatureDate(workbook, cW, payPeriods) {
  let targetLine = startingRow + payPeriods[cW-1].dates.length;
  // let targetLine2 = targetLine + bothPayPeriods[cW-1].payPeriod2.length + tableGap - 1;

  let signLineStyle = workbook.createStyle({
    border: {
      top: {
        style: 'thin'
      }
    },
    font: {
      bold: true
    }
  });

  //name line
  function nameLine(targetLine) {
    worksheet[cW].cell( (targetLine + 5), startingColumn)
      .string('Employee Name (Printed)');
      worksheet[cW].cell( (targetLine + 5), startingColumn, (targetLine + 5), startingColumn + 2, true)
      .style(signLineStyle); //merged and formatted
  }
  //signature line
  function signatureLine(targetLine) {
    worksheet[cW].cell( (targetLine + 5), (startingColumn + 4))
    .string('Employee Signature');
    worksheet[cW].cell( (targetLine + 5), startingColumn + 4, (targetLine + 5), startingColumn + 4 + 5, true)
      .style(signLineStyle); //merged and formatted
  }
  //date line
  function dateLine(targetLine) {
    worksheet[cW].cell( (targetLine + 5), (startingColumn + 11))
    .string('Date');
    worksheet[cW].cell( (targetLine + 5), startingColumn + 11, (targetLine + 5), startingColumn + 11 + 3, true)
    .style(signLineStyle); //merged and formatted
  }
  //supervisor sign-off line
  function supervisorLine(targetLine) {
    worksheet[cW].cell( (targetLine + 9), startingColumn + 4)
      .string("SFNC Senior Manager Signature");
    worksheet[cW].cell( (targetLine + 9), startingColumn + 4, (targetLine + 9), (startingColumn + 4 + 5), true)
      .style(signLineStyle);  //merged and formatted
  }

  //supervisor sign-off line
  function sfncManager(targetLine) {
    worksheet[cW].cell( (targetLine + 9), startingColumn)
      .string("Supervisor Signature");
    worksheet[cW].cell( (targetLine + 9), startingColumn, (targetLine + 9), (startingColumn + 2), true)
      .style(signLineStyle);  //merged and formatted
  }


  //for sheet1
  nameLine(targetLine);
  signatureLine(targetLine);
  dateLine(targetLine);
  supervisorLine(targetLine);
  sfncManager(targetLine);
  //for sheet2
  // nameLine(targetLine2);
  // signatureLine(targetLine2);
  // dateLine(targetLine2);
  // supervisorLine(targetLine2);

}

module.exports = {
  addSheetTitles,
  addStyles,
  addSheet,
  addDates,
  addCategories,
  addFormulas,
  addNameSignatureDate,
  addEntrySheet
};