
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

readInterface.on('line', function (line) {

    const regex1 = /(\d|one|two|three|four|five|six|seven|eight|nine).*/; // Regular expression with passable capture for the first number
    const regex2 = /.*(\d|one|two|three|four|five|six|seven|eight|nine)/; // Regular expression with one capture for the last number

    const matches1 = line.match(regex1); // Apply the first regular expression to the line
    const matches2 = line.match(regex2); // Apply the second regular expression to the line

    if (matches1 && matches2) {
        const firstNumber = parseIntFromDigitOrString(matches1[1]);
        const lastNumber = parseIntFromDigitOrString(matches2[1]);
        console.log("Numbers found: " + firstNumber + " and " + lastNumber);
        sum += 10 * firstNumber + lastNumber;
    }
});

readInterface.on('close', function () {
    console.log("End sum");
    console.log(sum);
});

function parseIntFromDigitOrString(passedString) {
    if (typeof passedString === 'string') {
        switch (passedString) {
            case 'one':
                return 1;
            case 'two':
                return 2;
            case 'three':
                return 3;
            case 'four':
                return 4;

            case 'five':
                return 5;

            case 'six':
                return 6;

            case 'seven':
                return 7;

            case 'eight':
                return 8;

            case 'nine':
                return 9;
            default:
                return parseInt(passedString);
        }
    } else if (typeof passedString === 'number') {
        return passedString;
    }
}





