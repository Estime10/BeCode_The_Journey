// exemple Date
// let dateInThePast = new Date("1990-12-25, 22:12:00")

// console.log(dateInThePast.getDate())
// console.log(dateInThePast.getDay()) 
// console.log(dateInThePast.getFullYear()) 
// console.log(dateInThePast.getHours()) 
// console.log(dateInThePast.getMilliseconds()) 
// console.log(dateInThePast.getMinutes()) 
// console.log(dateInThePast.getMonth()) 
// console.log(dateInThePast.getSeconds()) 
// console.log(dateInThePast.getUTCHours())

// // exemple hours epoch
// let christmas1995 = new Date('1995-12-25')
// let halloween2002 = new Date('2002-10-30')

// console.log((halloween2002.getTime() / 1000) + ' seconds have passed betweeen halloween 2002 and 1/1/1970')
// console.log((halloween2002.getTime() - christmas1995.getTime()) / (1000 * 60) + ' minutes have passed betweeen halloween 2002 and c')

// // exemple 3 days 
//  let halloween2000 = new Date("2000-10-30")
//  let threeDays = 1000 * 60 * 60 * 24 * 3 //1000 miliseconds * 60 seconds * 60 min * 24h * 3 days

//  let threeDaysPastHalloween2000 = new Date(halloween2000.getTime() + threeDays)

// console.log(threeDaysPastHalloween2000.toString())







// 1- define the hours in selected countries 
// brussels hours 
const brusselTime = function () {
    
    document.getElementById("brussels").innerHTML = 
new Date ().toLocaleString("fr-BE",{timeZone:'Europe/Brussels',timeStyle :'medium', hourCycle:'h24'})
};
// set every second to make sure it's refreshes
brusselTime()
setInterval(brusselTime,1000);

// brussels2 date
const brusselTime2 = function () {
    
    document.getElementById("brussels2").innerHTML = 
new Date ().toLocaleString("fr-BE",{timeZone:'Europe/Brussels',dateStyle:'medium'})
};
// set every second to make sure it's refreshes
brusselTime2()
setInterval(brusselTime2,1000);

// US hours
const usTime = function () { 
    document.getElementById('anchorage').innerHTML =
    new Date ().toLocaleString("fr-BE",{timeZone:'japan',dateStyle:'medium',timeStyle :'long', hourCycle:'h12'})
    };

    usTime()
    setInterval(usTime,1000);
    
    // Iceland hours
    const icelandTime = function () { 
    document.getElementById('reykjavik').innerHTML =
    new Date ().toLocaleString("fr-BE",{timeZone:'Atlantic/Reykjavik',dateStyle:'medium',timeStyle :'medium', hourCycle:'h24'})
    };
    icelandTime()
    setInterval(icelandTime,1000);
    
    // Russia hours
    const RussiaTime = function () { 
    document.getElementById('stpeter').innerHTML =
    new Date ().toLocaleString("fr-BE",{timeZone:'Etc/GMT-3',dateStyle:'medium',timeStyle :'long', hourCycle:'h24'})
    };
    RussiaTime()
    setInterval(RussiaTime,1000);

// 2-find out numbers of days im on this world

// today
const today = new Date()

// DOB
const welcomeOnEarth = new Date("1988-03-08")
// results
const theTruth = ((today.getTime() - welcomeOnEarth.getTime())/ (1000 * 60 * 60 * 24))
// console.log(theTruth)

const oldKnees = function() {
   document.getElementById("age").innerHTML = 
   ( " I already spent " + (Math.trunc(theTruth)) + " days on earth")
}
// call back the const to run it
oldKnees()

// 3- define how many days have passed 

function daysDifference() {  
    //define two variables and fetch the input from HTML form  
    let dateI1 = document.getElementById("dateInput1").value;  
    let dateI2 = document.getElementById("dateInput2").value;  

   //define two date object variables to store the date values  
    let date1 = new Date(dateI1);  
    let date2 = new Date(dateI2);  

   //calculate time difference  
    let time_difference = date2.getTime() - date1.getTime();  

    //calculate days difference by dividing total milliseconds in a day  
    let result = time_difference / (1000 * 60 * 60 * 24);  

    return document.getElementById("result").innerHTML =    
    result + " days between both dates. ";  
 } 

//  4- define a function to add up hours in a random Date

document.getElementById("numberInput").addEventListener('keyup', function (e) {
    
  
    if (e.key === 'Enter'){        
      const num = document.getElementById("numberInput").value
    //   console.log(num)
  
      const total = today.setTime(today.getTime() + num * 60 * 60 * 1000);
      const dateFormat = new Date(total)
// constante dateFormat va changer le total en format de date
      return document.getElementById('convert').innerHTML = (dateFormat);
    }
  });
