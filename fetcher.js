//You need to make an http request and wait for the response.
//After the http request is complete, you need to take the data you receive
//and write it to a file in your local filesystem.

const request = require('request');
const fs = require('fs');

const slicedInput = process.argv.slice(2);

let URL = slicedInput[0];

let filePath = slicedInput[1];


let content = '';

request(URL, (error, response, body) => {
  content += error;
  content += response && response.statusCode;
  content += body;
  fs.writeFile(filePath, content, err => {
    if (err) {
      console.error(err);
      return;

    }
    let stats = fs.statSync(filePath);
    let fileSizeInBytes = stats["size"];
    console.log(`Downloaded and saved ${fileSizeInBytes} to ${filePath}`);
  });
  
});

// var fs = require("fs"); //Load the filesystem module
// var stats = fs.stat("file.txt")
// var fileSizeInBytes = stats["size"]
