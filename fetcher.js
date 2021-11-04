//You need to make an http request and wait for the response.
//After the http request is complete, you need to take the data you receive
//and write it to a file in your local filesystem.


const slicedInput = process.argv.slice(2);
let URL = slicedInput[0];

const request = require('request');
const fs = require('fs');

let content = '';

request(URL, (error, response, body) => {
  content += error;
  content += response && response.statusCode;
  content += body;
  fs.writeFile('/Users/tobias/lighthouse/w2/d3/page-fetcher/file.txt', content, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('file written successfully');
  });
  
});