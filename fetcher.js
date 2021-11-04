//You need to make an http request and wait for the response.
//After the http request is complete, you need to take the data you receive
//and write it to a file in your local filesystem.

const request = require('request');
const fs = require('fs');

const slicedInput = process.argv.slice(2);

let URL = slicedInput[0];

let filePath = slicedInput[1];

let content = '';

fs.access(filePath, fs.R_OK, err => { //checks if file exists by checking if it has permissions
  if (!err) { //if it doesn't throw an error, it means that it already exists because only an existing file can have permissions
    console.log("File exists");
    return;
  }//otherwise it continues on and writes the results of the code below into the passed in file (which will create a new file named what is passed in)
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
    });
  });
});