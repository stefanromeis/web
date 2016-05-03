/**
 * New node file
 */
var request = require("request");

request("localhost:3000", function(error, response, body) {
  console.log(body);
});