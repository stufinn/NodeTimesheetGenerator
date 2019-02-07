function arrayOfDates(year, numSheets, firstDueDay, payDates) {

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

// arrayOfDates(2019,24,26,[
//   'Jan 30',
//   'Feb 15',
//   'Feb 28',
//   'March 15',
//   'March 29',
//   'April 15',
//   'April 30',
//   'May 15',
//   'May 30',
//   'June 14',
//   'June 28',
//   'July 15',
//   'July 30',
//   'Aug 15',
//   'Aug 30',
//   'Sep 13',
//   'Sep 30',
//   'Oct 15',
//   'Oct 30',
//   'Nov 15',
//   'Nov 29',
//   'Dec 13',
//   'Dec 30',
//   'Jan 15'
// ]);


module.exports = {arrayOfDates};