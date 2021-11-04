//You need to make an http request and wait for the response.
//After the http request is complete, you need to take the data you receive
//and write it to a file in your local filesystem.
const { fetch, filePath } = require('./fetchFunction');
const readline = require('readline');
const fs = require('fs');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});




fs.access(filePath, fs.R_OK, err => { //checks if file exists by checking if it has permissions
  if (!err) { //if it does not throw an error, it means that it already exists because only an existing file can have permissions
    rl.question(`File already exists. Would you like to overwrite the file? Y/N:`, (answer) => {
      if (answer.trim() === `N` || answer.trim() === `n` || answer.trim() === `no` || answer.trim() === `No`) {
        console.log("Okay, try again with a new file path");  //if they don't want to overwrite then tells them to try again
        process.exit(); //exits the process
      }
      if (answer.trim() === `Y` || answer.trim() === `y` || answer.trim() === `yes` || answer.trim() === `Yes`) {
        fetch(); //if they want to overwrite then executes fetch
      }
    });
  }
  if (err) { //if file does not exist then executes fetch
    fetch();
  }
});

