const request = require("request");

const fetchMyIP = function (callback) {
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



module.exports = { fetchMyIP };