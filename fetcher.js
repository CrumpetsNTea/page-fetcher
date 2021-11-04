//You need to make an http request and wait for the response.
//After the http request is complete, you need to take the data you receive
//and write it to a file in your local filesystem.

const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


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

fs.access(filePath, fs.R_OK, err => { //checks if file exists by checking if it has permissions
  if (!err) { //if it does not throw an error, it means that it already exists because only an existing file can have permissions
    rl.question(`File already exists. Would you like to overwrite the file? Y/N:`, (answer) => {
      if (answer.trim() === `N`) { //if they type no
        console.log("Okay, try again with a new file path");
        process.exit();
      }
      if (answer.trim() === `Y`) { //if they want to overwrite then executes fetch
        fetch();
      }
    });
  }
  if (err) { //if file does not exist then executes fetch
    fetch();
  }
});

