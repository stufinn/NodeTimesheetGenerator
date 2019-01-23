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
  for (let i = 1; i <= months[cW-1].days; i++) {
    worksheet[cW].cell(1 + i, 1)
    .string(`${months[cW-1].name} ${i}`)
    // .style(titleStyle);  //apply style
  }
};

const addCategories = (cW) => {
  for (let x = 0; x < categories.length; x++) {
    worksheet[cW].cell(1, x + 1)
      .string(`${categories[x].name}`);
      // .style(titleStyle)
      // .style(centerStyle);
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
    worksheet[cW].cell(2 + i,1)
    .style(titleStyle);
  }

  //add styling to titles row
  for (let j = 0; j < categories.length; j++) {
    worksheet[cW].cell(1,1 + j)
      .style(titleStyle)
      .style(centerStyle);
  }

  //add styling to core cells
  for (let k = 0; k < categories.length-1; k++) {
    for (l = 0; l < months[cW-1].days; l++) {
      worksheet[cW].cell(2+l,2+k)
        .style(coreCellStyle)
        .style(centerStyle);
    }
  }
};

module.exports = {
  addStyles,
  addSheet,
  addDates,
  addCategories
};