const xl = require('excel4node');
// const dateGen = require('./dateGenerator');

// variables to assign where the top left hand corner of the table should occur
const startingRow = 2;
const startingColumn = 2;
//start second table X rows below first
const tableGap = 5;

let worksheet = [];

const categories = [
  {
    name: 'Date',
    short: 'Date',
    type: 'autoGen'
  },
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
  name: '',
  short: '[custom1]',
  type: 'userEntered'
  },
  {
    name: '',
    short: '[custom2]',
    type: 'userEntered'
  },
  {
    name: '',
    short: '[custom3]',
    type: 'userEntered'
  },
  {
    name: '',
    short: '[custom4]',
    type: 'userEntered'
  }, 
  {
    name: 'Total',
    short: 'Total',
    type: 'autoGen'
  }
];

const addSheet = (workbook, cW, bothPayPeriods) => {
  worksheet[cW] = workbook.addWorksheet(`${bothPayPeriods[cW-1].name}`, {
    'sheetFormat': {
      // 'baseColWidth': 20
      // 'defaultColWidth': 20
    }
  });
}

const addDates = (cW, bothPayPeriods) => {

  let payPeriod1 = bothPayPeriods[cW-1].payPeriod1;
  let payPeriod2 = bothPayPeriods[cW-1].payPeriod2;
  //start second table X rows below first
  let startTable2 = startingRow + payPeriod1.length + tableGap;

  //insert dates for first pay period
  for (let i = 0; i < payPeriod1.length; i++) {
    worksheet[cW].cell( (startingRow+1) + i, startingColumn)
      .string(`${payPeriod1[i]}`);
  }

  //insert dates for second pay period below first table
  for (let j = 0; j < payPeriod2.length; j++) {
    worksheet[cW].cell( startTable2 + j, startingColumn)
    .string(`${payPeriod2[j]}`);
  }
};

const addCategories = (cW) => {
  for (let x = 0; x < categories.length; x++) {
    worksheet[cW].cell(startingRow, startingColumn + x)
      .string(`${categories[x].name}`);
  } 
};

const addFormulas = (cW, bothPayPeriods) => {
  // Total (per day)
  let payPer1 = bothPayPeriods[cW-1].payPeriod1;
  let payPer2 = bothPayPeriods[cW-1].payPeriod2;

  let daysTotalsCol = startingColumn + categories.length - 1;
  let startRow1 = startingRow + 1;
  let startRow2 = startingRow + payPer1.length + tableGap; //check value

  function dateTotals(cW, startRow, daysTotalsCol, numCells) {
    for (let m = 0; m < numCells; m++) {
      let firstDaysTotCell = xl.getExcelCellRef(startRow + m, startingColumn + 1 );
      let lastDaysTotCell = xl.getExcelCellRef(startRow + m, daysTotalsCol - 1 );
      worksheet[cW].cell(startRow + m, daysTotalsCol)
      .formula(`SUM(${firstDaysTotCell}:${lastDaysTotCell})`);
    }
   }
   
  function categoryTotals(cW, startCatRow, startCol, categTotRow, numCategories){
  
    for (let n = 0; n < numCategories; n++) {
      let firstCategTotCell = xl.getExcelCellRef(startCatRow + 1, startCol + n);
      let lastCategTotCell = xl.getExcelCellRef(categTotRow - 1, startCol + n);
      worksheet[cW].cell(categTotRow, startCol + n)
      .formula(`SUM(${firstCategTotCell}:${lastCategTotCell})`);
    }
  }


  // Add totals for first table
  dateTotals(cW, startRow1, daysTotalsCol, payPer1.length);

  // Add totals for second table
  dateTotals(cW, startRow2, daysTotalsCol, payPer2.length);

  // Total (per category)
  let startCategoryTotCol = startingColumn + 1;
  let startCatRow1 = startingRow;
  let startCatRow2 = startCatRow1 + payPer1.length + tableGap - 1;
  let categTotRow1 = startingRow + payPer1.length + 1;
  let categTotRow2 = categTotRow1 + payPer2.length + tableGap - 1;
  let numOfCategories = categories.length - 1; //don't include 'totals' category

  // Add category totals for first table
  categoryTotals(cW, startCatRow1, startCategoryTotCol, categTotRow1, numOfCategories);
  // Add category totals for second table
  categoryTotals(cW, startCatRow2 ,startCategoryTotCol, categTotRow2, numOfCategories);

};

const addStyles = (workbook,cW, bothPayPeriods) => {

  let pay_Per1 = bothPayPeriods[cW-1].payPeriod1;
  let pay_Per2 = bothPayPeriods[cW-1].payPeriod2;

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
      }
    }
  });

  var daysTotalStyle = workbook.createStyle({
    font: {
      bold: true
    },
    border: {
      left: {
        style: 'thick'
      },
      right: {
        style: 'thin'
      }
    }
  });
  
  var dateStyle = workbook.createStyle({
    alignment: {
      horizontal: 'right'
    }
  });

  // fill: {
  //   type: 'pattern',
  //   patternType: 'solid',
  //   color: '#0000ff'
  // }

  //  -- end of define styles -- //

  // ----- Add styling to titles row AND bottom totals row --- //

  function styleTitles(bothPayPeriods, cW, firstRow, firstCol, j) {
    worksheet[cW].cell(firstRow, firstCol + j)
    .style(titleStyle)
    .style(centerStyle)
    .style(categoryStyle);
  }

  function styleCategoryTots(bothPayPeriods, cw, catTotRow, catTotStartCol, j) {
    worksheet[cW].cell(catTotRow, catTotStartCol + j)
    .style(bottomTotalsStyle)
    .style(centerStyle);
  }

  // ----  Add title styles and Category Total Styles ------ //
  for (let j = 0; j < categories.length; j++) {
    //style title row at top
    styleTitles(bothPayPeriods, cW, startingRow, startingColumn, j);

    // style category-totals row for first table
    let catTotRow1 = startingRow + pay_Per1.length + 1;
    styleCategoryTots(bothPayPeriods, cW, catTotRow1, startingColumn, j );
   
    // style category-totals row for second table
    let catTotRow2 = catTotRow1 + pay_Per2.length + tableGap - 1;
    styleCategoryTots(bothPayPeriods, cW, catTotRow2, startingColumn, j );

  }


  // ----- Add Core Cell Styling ---- //

  function styleCoreCells(bothPayPeriods, cW, dates, coreRowStart) {
    for (let k = 0; k < categories.length - 2; k++) {
      worksheet[cW].column(startingColumn + 1 + k).setWidth(6); //set width for only core cell columns
      for (l = 0; l < dates.length; l++) {
        worksheet[cW].cell( (coreRowStart + l), (startingColumn + 1) + k)
          .style(coreCellStyle)
          .style(centerStyle);
      }
    }
  }

  let coreRowStart1 = startingRow + 1;
  //add styling to core cells for first table
  styleCoreCells(bothPayPeriods, cW, pay_Per1, startingRow + 1);
  //add styling to core cells for first table
  styleCoreCells(bothPayPeriods, cW, pay_Per2, startingRow + pay_Per1.length + tableGap);

    //add Styling to dates column AND dates total column

    // for (let i = 0; i < datesArray[cW-1].dates.length; i++) {
    //   worksheet[cW].column(startingColumn).setWidth(18);
    //   worksheet[cW].cell((startingRow+1) + i,startingColumn)
    //   .style(titleStyle)
    //   .style(dateStyle);
    //   worksheet[cW].cell(startingRow + 1 + i, startingColumn + categories.length - 1)
    //     .style(daysTotalStyle);
    // }
};

module.exports = {
  addStyles,
  addSheet,
  addDates,
  addCategories,
  addFormulas
};