const xl = require('excel4node');

// variables to assign where the top left hand corner of the table should occur
const startingRow = 2;
const startingColumn = 2;

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


const addSheet = (workbook, cW) => {
  worksheet[cW] = workbook.addWorksheet(`${months[cW-1].name}`, {
    'sheetFormat': {
      'baseColWidth': 12
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

  var coreCellStyle = workbook.createStyle({
    border: {
      top: {
        style: 'dotted'
      },
      right: {
        style: 'thin'
      },
      bottom: {
        style: 'dotted'
      },
      left: {
        style: 'thin'
      }
    }
  });

  var centerStyle = workbook.createStyle({
    alignment: {
      horizontal: 'center'
    }
  });

  //  -- end of define styles -- //

  //add Styling to dates column
  for (let i = 0; i < months[cW-1].days; i++) {
    worksheet[cW].cell((startingRow+1) + i,startingColumn)
    .style(titleStyle);
  }

  //add styling to titles row
  for (let j = 0; j < categories.length; j++) {
    worksheet[cW].cell(startingRow, startingColumn + j)
      .style(titleStyle)
      .style(centerStyle);
  }

  //add styling to core cells
  for (let k = 0; k < categories.length-1; k++) {
    for (l = 0; l < months[cW-1].days; l++) {
      worksheet[cW].cell((startingRow+1)+l,(startingColumn+1)+k)
        .style(coreCellStyle)
        .style(centerStyle);
    }
  }
};

module.exports = {
  addStyles,
  addSheet,
  addDates,
  addCategories,
  addFormulas
};