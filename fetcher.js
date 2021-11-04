//You need to make an http request and wait for the response.
//After the http request is complete, you need to take the data you receive
//and write it to a file in your local filesystem.


const slicedInput = process.argv.slice(2);
let URL = slicedInput[0];

const request = require('request');
const fs = require('fs');

request(URL, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});


fs.writeFile('/Users/tobias/lighthouse/w2/d3/page-fetcher/file.txt', content, err => {
  if (err) {
    console.error(err);
    return;
  }
  //file written successfully
});

