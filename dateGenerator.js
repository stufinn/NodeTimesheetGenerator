// To do: write an explanation of what this function does
// year is an Integer (e.g. 2019)
// numsheets is the number of sheets that need to be created. It is the length of the paydates array.
// payDates is an array objects (the pay dates as strings)
function arrayOfDates(year, numSheets, payDates) {
  // TEST STUFF

  // ---- This arrow function doesn't currently serve a purpose
  // const arrayOfDatesNew = (year, payDates) =>
  //   // Iterate over each date in the array
  //   payDates.map(date => console.log(date));

  // arrayOfDatesNew(year, payDates);
  // // Test Stuff

  // -------------------------------------

  let startDate = new Date(`Dec 26, ${year - 1}`);
  console.log(startDate);

  let nextDate = new Date(startDate);
  console.log(nextDate);

  let payPeriods = [];

  let monthDay = nextDate.getDate();

  // Can I use payDates.map() instead?
  for (let j = 0; j < numSheets; j++) {
    let dateCutoff;

    // console.log(`Sheet ${j+1}`);
    // payPeriods[j].dates.push(nextDate);
    // console.log(payPeriods[j]);

    // if using .map, can j be the index instead? Wouldn't need it bcause you'd just use the current 'item' in the .map sequence
    payPeriods.push({
      payDate: `${payDates[j].short}`,
      dates: []
    });

    function addToDateArray(dateCutoff) {
      while (monthDay != dateCutoff) {
        // console.log(nextDate);
        payPeriods[j].dates.push(nextDate.toDateString());
        nextDate.setDate(nextDate.getDate() + 1);
        monthDay = nextDate.getDate();
      }
    }

    if (monthDay >= 26 || monthDay <= 10) {
      dateCutoff = 11;
      addToDateArray(dateCutoff);
    } else if (monthDay >= 11 || monthDay <= 25) {
      dateCutoff = 26;
      addToDateArray(dateCutoff);
    }
  }

  // console.log(payPeriods);
  return payPeriods;
}

module.exports = { arrayOfDates };
