const xl = require('excel4node');
// const dateGen = require('./dateGenerator');

// variables to assign where the top left hand corner of the table should occur
const startingRow = 2;
const startingColumn = 2;

let worksheet = [];

// let datesArray = dateGen.arrayOfDates();


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

const months = [
  {
    name: "January",
    days: 31
  },
  {
    name: "February",
    days: 28  // ACCOUNT FOR LEAP YEARS!!
  },
  {
    name: 'March',
    days: 31
  },
  {
    name: 'April',
    days: 30
  },
  {
    name: 'May',
    days: 31
  },
  {
    name: 'June',
    days: 30
  },
  {
    name: 'July',
    days: 31
  },
  {
    name: 'August',
    days: 31
  },
  {
    name: 'September',
    days: 30
  },
  {
    name: 'October',
    days: 31
  },
  {
    name: 'November',
    days: 30
  },
  {
    name: 'December',
    days: 30
  }
];


const addSheet = (workbook, cW, datesArray) => {
  worksheet[cW] = workbook.addWorksheet(`${datesArray[cW-1].name}`, {
    'sheetFormat': {
      // 'baseColWidth': 20
      // 'defaultColWidth': 20
    }
  });
}

const addDates = (cW) => {
  for (let i = 0; i < months[cW-1].days; i++) {
    worksheet[cW].cell( (startingRow+1) + i, startingColumn)
    .string(`${months[cW-1].name} ${i+1}`);
  }
};

const addCategories = (cW) => {
  for (let x = 0; x < categories.length; x++) {
    worksheet[cW].cell(startingRow, startingColumn + x)
      .string(`${categories[x].name}`);
  } 
};

const addFormulas = (cW) => {
  // Total (per day)
  let daysTotalsCol = startingColumn + categories.length - 1;
  let startDaysTotalRow = startingRow + 1;

  for (let m = 0; m < months[cW-1].days; m++) {
    let firstDaysTotCell = xl.getExcelCellRef(startDaysTotalRow + m, startingColumn + 1 );
    let lastDaysTotCell = xl.getExcelCellRef(startDaysTotalRow + m, daysTotalsCol - 1);
    worksheet[cW].cell(startDaysTotalRow + m, daysTotalsCol)
      .formula(`SUM(${firstDaysTotCell}:${lastDaysTotCell})`);
  }
  // Total (per category)
  let categoryTotRow = startingRow + months[cW-1].days + 1;
  let startCategoryTotCol = startingColumn + 1;

  for (let n = 0; n < categories.length-1; n++) {
    let firstCategTotCell = xl.getExcelCellRef(startingRow + 1, startCategoryTotCol + n);
    let lastCategTotCell = xl.getExcelCellRef( categoryTotRow - 1, startCategoryTotCol + n );
    worksheet[cW].cell(categoryTotRow, startCategoryTotCol + n)
      .formula(`SUM(${firstCategTotCell}:${lastCategTotCell})`);
  }

};

const addStyles = (workbook,cW) => {

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
  })

  // var dateStyle = workbook.createStyle({
  //   alignment: {
  //     baseColWidth: 20
  //   }
  // })

  //  -- end of define styles -- //



  //add styling to titles row AND bottom totals row
  for (let j = 0; j < categories.length; j++) {
    worksheet[cW].cell(startingRow, startingColumn + j)
      .style(titleStyle)
      .style(centerStyle)
      .style(categoryStyle);

    worksheet[cW].cell(startingRow + months[cW-1].days + 1, startingColumn + j)
      .style(bottomTotalsStyle)
      .style(centerStyle);
  }

  //add styling to core cells
  for (let k = 0; k < categories.length-1; k++) {
    worksheet[cW].column(startingColumn + 1 + k).setWidth(6); //set width for only core cell columns
    for (l = 0; l < months[cW-1].days; l++) {
      worksheet[cW].cell((startingRow+1)+l,(startingColumn+1)+k)
        .style(coreCellStyle)
        .style(centerStyle);
    }
  }

    //add Styling to dates column AND dates total column
    for (let i = 0; i < months[cW-1].days; i++) {
      worksheet[cW].column(startingColumn).setWidth(13);
      worksheet[cW].cell((startingRow+1) + i,startingColumn)
      .style(titleStyle);
      worksheet[cW].cell(startingRow + 1 + i, startingColumn + categories.length - 1)
        .style(daysTotalStyle);
    }
};

module.exports = {
  addStyles,
  addSheet,
  addDates,
  addCategories,
  addFormulas
};