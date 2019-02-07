function arrayOfDates(year, numSheets, payDates) {

  let startDate = new Date(`Jan 11, ${year}`);
  // console.log(`Start Date: ${startDate}`);

  let nextDate = new Date(startDate);

  let payPeriods = [];

  let monthDay = nextDate.getDate();


  for (let j = 0; j < numSheets; j++) { 
    let dateCutoff;

    // console.log(`Sheet ${j+1}`);
    // payPeriods[j].dates.push(nextDate);
    // console.log(payPeriods[j]);

  
    payPeriods.push(
      {
        payDate: `${payDates[j]}`,
        dates: [],
      }
    );

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
    } else if (monthDay >=11 || monthDay <= 25) {
      dateCutoff = 26;
      addToDateArray(dateCutoff);
    }

  }

  // console.log(payPeriods);
  return payPeriods;

 
}

module.exports = {arrayOfDates};