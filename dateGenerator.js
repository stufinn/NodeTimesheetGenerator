let year = 2019;
let numMonths = 4;
let startDate = new Date(`Dec 8, ${year - 1}`);
let endDate = new Date(`Dec 7, ${year}`);
console.log(`Start Date: ${startDate}`);

let nextDate = new Date(startDate);

// while (nextDate < endDate) {
//   nextDate.setDate(nextDate.getDate() + 1);
//   console.log(nextDate);
// }

// nextDate = nextDate.setMonth(nextDate.getMonth() + 1);
// console.log(nextDate);

// while (nextDate < endDate ) {
  // nextDate.setMonth(nextDate.getMonth() + 1);
  // console.log(nextDate);
// }

months = ['Dec-Jan','Jan-Feb','Feb-Mar','Mar-Apr','Apr-May','May-Jun','Jun-Jul','Jul-Aug','Aug-Sep','Sep-Dec'];

// For each of the 'months', starting with months[0], add in consecutive dates.
// Starting date is Dec 8 of the previous year
// User inputs the current year and number of 'months' desired

let monthCounter = 0;

for (i=0; i < numMonths; i++) {

  currentMonth = nextDate.getMonth();
  
//   console.log(currentMonth);

  // let dayCount = 0;

  nextMonth = new Date(nextDate);
  nextMonth.setMonth(nextMonth.getMonth()+1);
  // console.log('Next Month:', nextMonth);

//   // while the nextDate value is less than the 24th of the following month
//   // figure out how to properly specify the 24th of the next month
  while (nextDate < nextMonth) {
    // console.log('hey');
    //get the next day
    nextDate.setDate(nextDate.getDate() + 1);
    //log it to the console
    console.log(nextDate.toDateString());

    // dayCount += 1;
    // console.log(dayCount);
  }
  // while (nextDate < )
  startDate = nextDate; 
  
  // monthCounter += 1;
  // // Reset monthCounter to 0 if gets beyond 12
  // if (monthCounter == 13) {
  //   monthCounter = 0;
  // }
}