//const { fetchMyIP } = require("./iss");
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });


//const { fetchCoordsByIP } = require("./iss");
// const ip = "104.205.19.251";

// fetchCoordsByIP (ip, (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned coordinates:", coordinates);
// });


//const { fetchISSFlyOverTimes } = require("./iss");
// const coords = { latitude: '53.544389', longitude: '-113.4909267 '};

// fetchISSFlyOverTimes(coords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned flyover times:", passTimes);
// });


const { nextISSTimesForMyLocation } = require("./iss");

//loop through each passtime in array and console log message to make data more human readable.

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   //print out the dates
//   printPassTimes(passTimes);
// });


module.exports = { printPassTimes };