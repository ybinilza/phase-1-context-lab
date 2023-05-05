
function createEmployeeRecord(empArray)
{
    const empOject = {
        firstName : empArray[0],
        familyName : empArray[1],
        title : empArray[2],
        payPerHour : empArray[3],
        timeInEvents : [],
        timeOutEvents : []
    };

    return empOject;
}



function createEmployeeRecords(empRecords)
{  
   let emplObject = [];
   empRecords.forEach(element => { 
    emplObject.push(createEmployeeRecord(element))
   
   });
return emplObject;
}



function createTimeInEvent(dateStamp) 
{
  let [dateFromDateStamp,timefromTimeStamp]= dateStamp.split(" ");
   timefromTimeStamp=parseInt(timefromTimeStamp,10);
   let len =this.timeInEvents.length;
  // console.log(len);
   const typeTimeIn = {
        type : "TimeIn" ,
        hour : timefromTimeStamp,
        date : dateFromDateStamp,
    };
    
    this.timeInEvents[len]= typeTimeIn;
    
   return (this);
}

function createTimeOutEvent(dateStamp) 
{
  let [dateFromDateStamp,timefromTimeStamp]= dateStamp.split(" ");
   timefromTimeStamp=parseInt(timefromTimeStamp,10);
   let len =this.timeOutEvents.length;
   const typeTimeOut = {
        type : "TimeOut" ,
        hour : timefromTimeStamp,
        date : dateFromDateStamp,
    };
    
    this.timeOutEvents[len]= typeTimeOut;
    
   return (this);
}


function hoursWorkedOnDate(date) 
{
   let punchInTime = this.timeInEvents.find( e => e.date === date);
   let punchOutTime = this.timeOutEvents.find( e => e.date === date)
   return (punchOutTime.hour - punchInTime.hour)/100;
}

function wagesEarnedOnDate(date) 
{

   return(hoursWorkedOnDate.call(this,date) * this.payPerHour);
}


function findEmployeeByFirstName(src, name)
{ 
   return src.find(record => record.firstName === name);
}

const allWagesFor = function () {
   const eligibleDates = this.timeInEvents.map(function (e) {
       return e.date
   })

   const payable = eligibleDates.reduce(function (memo, d) {
       return memo + wagesEarnedOnDate.call(this, d)
   }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

   return payable
}

function calculatePayroll(empRecords)
{ 
   const totalforEachEmployee = empRecords.map(record => allWagesFor.call(record))
   return totalforEachEmployee.reduce((total, emptotal) => total + emptotal)

}
