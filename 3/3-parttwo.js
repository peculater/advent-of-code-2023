
function lineToNumbersWithOffsets(line) {
    const offsets = [];
    const lengths = [];
    const numbers = []; // Added numbers array to store the numbers found
    let currentOffset = 0;
    let currentNumber = '';

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (/[0-9]/.test(char)) {
            currentNumber += char;
        } else {
            if (currentNumber.length > 0) {
                offsets.push(currentOffset);
                lengths.push(currentNumber.length);
                numbers.push(Number(currentNumber)); // Store the current number as a number
                currentOffset += currentNumber.length;
                currentNumber = '';
            }
            currentOffset++;
        }
    }

    if (currentNumber.length > 0) {
        offsets.push(currentOffset);
        lengths.push(currentNumber.length);
        numbers.push(Number(currentNumber));
    }

    return { offsets, lengths, numbers }; // Return an object containing offsets, lengths, and numbers arrays
}

function lineToSymbolOffsets(line) {
    // Part two only matches the * symbol
    const offsets = [];
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if ((/[*]/).test(char)) {
            offsets.push(i);
        }
    }
    return {offsets};
}

function mapOffsetsToCoordinates(offsets, lineno) {
    return { coordinates: offsets.map(offset => [offset, lineno]) };
}

function numberCoordinatesToValidSymbolCoordinates(numberCoordinates, lengths, numbers) {
    const validCoordinates = [];

    for (let i = 0; i < numberCoordinates.length; i++) {
        const [start, lineno] = numberCoordinates[i];
        const length = lengths[i];
        const number = numbers[i];
        const end = start + length;

        for (let j = start-1; j < end+1; j++) {
            // Coordinates on the line above and below also count as valid
            validCoordinates.push({coordinate: [j, lineno-1], value: number});
            validCoordinates.push({coordinate: [j, lineno], value: number});
            validCoordinates.push({coordinate: [j, lineno+1], value: number});
        }
    }

    return {coordinates: validCoordinates};
}

function validSymbolCoordinatesAndSymbolLocationsToValues(validSymbolCoordinates, symbolCoordinates) {
    const values = [];
    const symbolCoordinateSet = new Set(symbolCoordinates.map(JSON.stringify));


    for (let i = 0; i < validSymbolCoordinates.length; i++) {
        const {coordinate, value} = validSymbolCoordinates[i];
        if (symbolCoordinateSet.has(JSON.stringify(coordinate))) {  
            values.push(value);
        }
    }

    return {values};
}


function findDualValidSymbolCoordinates(validSymbolCoordinates) {
    // Create a map of coordinates to values
    const coordinateValueMap = new Map();
    for (let i = 0; i < validSymbolCoordinates.length; i++) {
        const {coordinate, value} = validSymbolCoordinates[i];
        if (coordinateValueMap.has(JSON.stringify(coordinate))) {
            coordinateValueMap.get(JSON.stringify(coordinate)).push(value);
        } else {
            coordinateValueMap.set(JSON.stringify(coordinate), [value]);
        }
    }
    //iterate over the map.  If there are two values, return the key as an array and multiply the values
    const dualValidSymbolCoordinates = [];
    for (let [key, value] of coordinateValueMap) {
        if (value.length === 2) {
            dualValidSymbolCoordinates.push({ coordinate: JSON.parse(key), value: value[0] * value[1]});
        }
    }
    return dualValidSymbolCoordinates;
}

function main() {
    const fs = require('fs');
    const readline = require('readline');

    const filePath = process.argv[2]; // Get the file path from the command line argument
    var allNumberCoordinates = [];
    var allSymbolCoordinates = [];

    const readInterface = readline.createInterface({
        input: fs.createReadStream(filePath),
        //output: process.stdout,
        console: false
    });

    var lineno = 0;
    readInterface.on('line', function (line) {
        lineno++;

        //Process the line into numbers and symbols
        const { offsets: numberOffsets, lengths: numberLengths, numbers: numberValues } = lineToNumbersWithOffsets(line);
        const { offsets: symbolOffsets } = lineToSymbolOffsets(line);

        //Map the offsets to coordinates
        const { coordinates: numberCoordinates } = mapOffsetsToCoordinates(numberOffsets, lineno);
        const { coordinates: symbolCoordinates } = mapOffsetsToCoordinates(symbolOffsets, lineno);

        //Find what coordinates make valid targets for symbols
        const { coordinates: validSymbolCoordinates } = numberCoordinatesToValidSymbolCoordinates(numberCoordinates, numberLengths, numberValues);

        // Append the number and symbol coordinates to the global arrays
        allSymbolCoordinates = allSymbolCoordinates.concat(symbolCoordinates);
        allNumberCoordinates = allNumberCoordinates.concat(validSymbolCoordinates);
    });

    readInterface.on('close', function () {
        //Find the values of the symbols that are valid targets
        allDualCoordinates = findDualValidSymbolCoordinates(allNumberCoordinates);
        const { values } = validSymbolCoordinatesAndSymbolLocationsToValues(allDualCoordinates, allSymbolCoordinates);
        //Sum the values
        const sum = values.reduce((a, b) => a + b, 0);

        console.log("End sum");
        console.log(sum);
    });
}

if (require.main === module) {
    main();
}
module.exports = {
    lineToNumbersWithOffsets,
    lineToSymbolOffsets,
    mapOffsetsToCoordinates,
    numberCoordinatesToValidSymbolCoordinates,
    validSymbolCoordinatesAndSymbolLocationsToValues,

    findDualValidSymbolCoordinates
};