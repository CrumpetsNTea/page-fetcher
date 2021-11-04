const request = require('request');
const fs = require('fs');

const slicedInput = process.argv.slice(2);

let URL = slicedInput[0];

let filePath = slicedInput[1];

let content = '';

const fetch = () => { //define a function that will execute our fetch code

  console.log("Getting file information");
  request(URL, (error, response, body) => {
    content += error; //if error, pushes it to file
    content += response && response.statusCode; //pushes to content string
    content += body; //pushes to content string
    fs.writeFile(filePath, content, err => { //after all info has been added to variable content, it is written to designated file
      if (err) {
        console.error(err);
        return; //if there is an error it will console.log it and abort
      }

      let stats = fs.statSync(filePath); //gets the stats of the file once it's been written to
      let fileSizeInBytes = stats["size"]; //gets the size of the file
      console.log(`Downloaded and saved ${fileSizeInBytes} to ${filePath}`); //console.logs final message saying size and file path
      process.exit(); //exits process once it is done otherwise readline stays open
    });

  });
};

module.exports = { fetch, filePath };