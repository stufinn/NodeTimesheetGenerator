let months = [
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

let ws = [];


//ADD ALL WORKSHEETS FUNCTION
const addAll = (numSheets, wb, month) => {
  for (let i = 1; i < (numSheets + 1); i++) {
    ws[i] = wb.addWorksheet(`Sheet ${i}`);
  }

  //define a style
  var topRowStyle = wb.createStyle({
    font: {
      size: 12
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

  //add dates to left-side columns of each spreadsheet
  // parameter is the topRow style
  addDates(topRowStyle);
}

const addDates = (topRow) => {

  for (let j = 0; j < (ws.length - 1); j++ ) {

    for (let k = 1; k <= months[j].days; k++) {
      ws[j+1].cell(1 + k, 1)
      .string(`${months[j].name} ${k}`)
      .style(topRow);  //apply style
    }
    // console.log(months[j].name);
  };
}

// const addTitles = ()

module.exports = {addAll};