function arrayOfDates(year, numMonths, firstDueDay) {

  // let year = 2019;
  // let numMonths = 2;
  let startDate = new Date(`Jan 10, ${year - 1}`);
  // let endDate = new Date(`Dec 7, ${year}`);
  // console.log(`Start Date: ${startDate}`);

  let nextDate = new Date(startDate);

  monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // For each of the 'months', starting with months[0], add in consecutive dates.
  // Starting date is ${startDate} of the previous year
  // User inputs the current year and number of 'months' desired

  //push both arrays onto this array, and return THIS
  let bothPayPeriods = [];

  for (i = 0; i < numMonths; i++) {
    // currentMonth = nextDate.getMonth();
    let singleMonth = {};  //delete?

    //assigns ths variable with the end date of the first pay period in ea. month
    const firstDueDate = new Date(nextDate);
    firstDueDate.setDate(firstDueDay);

    nextMonth = new Date(nextDate);
    nextMonth.setMonth(nextMonth.getMonth()+1);

    bothPayPeriods.push({
      name: `${monthIndex[nextDate.getMonth()]}-${monthIndex[nextMonth.getMonth()]}'${nextMonth.getFullYear().toString().slice(2,5)}`,  // e.g. Dec-Jan'19
      payPeriod1: [],
      payPeriod2: []
    });

    // while the nextDate value is less than the Xth of the following month
    // figure out how to properly specify the Xth of the next month
    while (nextDate < nextMonth) {
      //get the next day
      let currentDate = new Date(nextDate.setDate(nextDate.getDate() + 1));  // without assigning this to a new date obj, the printing didn't work :/  - not sure why
      
      if (currentDate < firstDueDate) {
        bothPayPeriods[i].payPeriod1.push(currentDate.toDateString());
      } else if (currentDate >= firstDueDate) {
        bothPayPeriods[i].payPeriod2.push(currentDate.toDateString());
      }
      
    }
    

  }
  
  return bothPayPeriods;

}

module.exports = {arrayOfDates};