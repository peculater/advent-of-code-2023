console.log("yo dawg");

// Open the file called 'input' and read the content one line at a time
const fs = require('fs');
const readline = require('readline');

const filePath = './input'; 
var sum = 0;

const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    console: false
});

readInterface.on('line', function(line) {
    
    const regex1 = /(\d).*/; // Regular expression with one capture for the first number
    const regex2 = /.*(\d)/; // Regular expression with one capture for the last number
    
    const matches1 = line.match(regex1); // Apply the first regular expression to the line
    const matches2 = line.match(regex2); // Apply the second regular expression to the line
    
    if (matches1 && matches2) {
        const firstNumber = parseInt(matches1[1]);
        const lastNumber = parseInt(matches2[1]);
        console.log("Numbers found: " + firstNumber + " and " + lastNumber);
        sum += 10*firstNumber + lastNumber;
    }
});

readInterface.on('close', function() {
    console.log("End sum");
    console.log(sum);
});





