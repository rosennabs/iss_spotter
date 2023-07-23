const request = require("request");

//Fetches an IP address
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api64.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ipAddress = JSON.parse(body).ip;
    callback(null, ipAddress);
    
     
  });
};

//Fetches geo coordinates using an IP address
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) { //outputs error for the failed request eg. for an incorrect domain
      return callback(error, null);
    }
    const data = JSON.parse(body);

    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null); //outputs error message from the callback function in index.js
      return;
    }
    
    const { latitude, longitude } = data;
    callback(null, { latitude, longitude });
  });
};

//Makes a single API request to retrieve upcoming ISS fly over times for the given lat/lng coordinates.
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const data = JSON.parse(body).response;
    callback(null, data);

  });
};

//Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};
  

module.exports = {
  nextISSTimesForMyLocation
};