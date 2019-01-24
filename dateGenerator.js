let year = 2019;
let numMonths = 2;
let startDate = new Date(`Dec 8, ${year - 1}`);
let endDate = new Date(`Dec 7, ${year}`);
// console.log(`Start Date: ${startDate}`);

let nextDate = new Date(startDate);

// months = ['Dec-Jan','Jan-Feb','Feb-Mar','Mar-Apr','Apr-May','May-Jun','Jun-Jul','Jul-Aug','Aug-Sep','Sep-Dec'];

monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// For each of the 'months', starting with months[0], add in consecutive dates.
// Starting date is Dec 8 of the previous year
// User inputs the current year and number of 'months' desired


let datesArray = [];

for (i = 0; i < numMonths; i++) {
  // currentMonth = nextDate.getMonth();
  let singleMonth = {};
  nextMonth = new Date(nextDate);

  nextMonth.setMonth(nextMonth.getMonth()+1);

  datesArray.push({
    name: `${monthIndex[nextDate.getMonth()]}-${monthIndex[nextMonth.getMonth()]}'${nextMonth.getFullYear().toString().slice(2,5)}`,  // e.g. Dec - Jan '19
    dates: []
  });
  

  // while the nextDate value is less than the 24th of the following month
  // figure out how to properly specify the 24th of the next month
  while (nextDate < nextMonth) {
    //get the next day

    let currentDate = new Date(nextDate.setDate(nextDate.getDate() + 1));  // without assigning this to a new date obj, the printing didn't work :/  - not sure why
    // console.log(nextDate.toDateString());
    datesArray[i].dates.push(currentDate.toDateString());
    
  }
  

}

console.log(datesArray);
console.log(datesArray.length);