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

// These are the categories of time that employees can log
// Array of objects allows for more flexibility with the data (i.e. shortnames etc)

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

let ws = [];


//ADD ALL WORKSHEETS FUNCTION
const addAll = (numSheets, wb, month) => {
  for (let i = 1; i < (numSheets + 1); i++) {
    ws[i] = wb.addWorksheet(`Sheet ${i}`, {
      'sheetFormat': {
        'baseColWidth': 12
      }
    });
  }

  //define a style
  var titleStyle = wb.createStyle({
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

  var centerStyle = wb.createStyle({
    alignment: {
      horizontal: 'center'
    }
  });

  var coreCellStyle = wb.createStyle({
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

  //add dates to left-side columns of each spreadsheet
  // parameter is the topRow style
  addDates(titleStyle);

  addTitles(titleStyle, centerStyle);

  formatCoreCells(coreCellStyle);
}

const addDates = (titleStyle) => {

  // for each _worksheet_ do...
  for (let j = 0; j < (ws.length - 1); j++ ) {
    // for each day in the month do...
    for (let k = 1; k <= months[j].days; k++) {
      ws[j+1].cell(1 + k, 1)
      .string(`${months[j].name} ${k}`)
      .style(titleStyle);  //apply style
    }
    // console.log(months[j].name);
  };
};

const addTitles = (titleStyle, centerStyle) => {

  // for each _worksheet_ do...
  for (let j = 0; j < (ws.length - 1); j++ ) {
    //for each time-categort do...
    for (let x = 0; x < categories.length; x++) {
      ws[j+1].cell(1, x + 1)
        .string(`${categories[x].name}`)
        .style(titleStyle)
        .style(centerStyle);
    } 
  }
};

const formatCoreCells = (style) => {
  // for each _worksheet_ do...
  for (let j = 0; j < (ws.length - 1); j++ ) {
   // for each core-cell do..
   for (let y = 1; y < (months[j].days + 1); y++ ) {
     for (let z = 0; z < (categories.length - 1); z++) {
       ws[j+1].cell(y+1, z+2)
         .style(style);
     }
   }
  }
}

module.exports = {addAll};