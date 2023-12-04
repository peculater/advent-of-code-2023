
//Unit tests
const chai = require('chai');
const assert = chai.assert;
const {
    lineToNumbersWithOffsets,
    lineToSymbolOffsets,
    mapOffsetsToCoordinates,
    numberCoordinatesToValidSymbolCoordinates,
    validSymbolCoordinatesAndSymbolLocationsToValues 
} = require('./3'); // adjust path as needed

describe('lineToNumbersWithOffsets', function () {
    it('should return offsets, lengths, and numbers from string', function () {
        assert.deepEqual(lineToNumbersWithOffsets('467..114..'), { offsets: [0, 5], lengths: [3, 3], numbers: [467, 114] });
    });
    it('should return nothing with no numbers', function () {
        assert.deepEqual(lineToNumbersWithOffsets('...*......'), { offsets: [], lengths: [], numbers: [] });
    });
});

describe('lineToSymbolOffsets', function () {
    it('should return offsets from string', function () {
        assert.deepEqual(lineToSymbolOffsets('...*......'), { offsets: [3] });
    });
    it('should return nothing with no symbols', function () {
        assert.deepEqual(lineToSymbolOffsets('467..114..'), { offsets: [] });
    });
});

describe('mapOffsetsToCoordinates', function () {
    it('should return coordinates from offsets and a line number', function () {
        assert.deepEqual(mapOffsetsToCoordinates([3, 6], 1), { coordinates: [[3, 1], [6, 1]] });
    });
    it('should return nothing with no offsets', function () {
        assert.deepEqual(mapOffsetsToCoordinates([]), { coordinates: [] });
    });
});

describe('numberCoordinatesToValidSymbolCoordinates', function () {
    it('should return valuable symbol coordinates from numberoffsets and values', function () {
        assert.deepEqual(numberCoordinatesToValidSymbolCoordinates( 
            [[3, 1], [6, 1]],
            [2, 3],
            [46, 114]
        ), { coordinates: [
            {coordinate: [2, 0], value: 46},
            {coordinate: [2, 1], value: 46},
            {coordinate: [2, 2], value: 46},
            {coordinate: [3, 0], value: 46},
            {coordinate: [3, 1], value: 46},
            {coordinate: [3, 2], value: 46},
            {coordinate: [4, 0], value: 46},
            {coordinate: [4, 1], value: 46},
            {coordinate: [4, 2], value: 46},
            {coordinate: [5, 0], value: 46},
            {coordinate: [5, 1], value: 46},
            {coordinate: [5, 2], value: 46},

            {coordinate: [5, 0], value: 114},
            {coordinate: [5, 1], value: 114},
            {coordinate: [5, 2], value: 114},
            {coordinate: [6, 0], value: 114},
            {coordinate: [6, 1], value: 114},
            {coordinate: [6, 2], value: 114},
            {coordinate: [7, 0], value: 114},
            {coordinate: [7, 1], value: 114},
            {coordinate: [7, 2], value: 114},
            {coordinate: [8, 0], value: 114},
            {coordinate: [8, 1], value: 114},
            {coordinate: [8, 2], value: 114},
            {coordinate: [9, 0], value: 114},
            {coordinate: [9, 1], value: 114},
            {coordinate: [9, 2], value: 114}
        ]});
    });
    it('should return nothing with no offsets', function () {
        assert.deepEqual(numberCoordinatesToValidSymbolCoordinates([], [], []), { coordinates: [] });
    });
});

describe('validSymbolCoordinatesAndSymbolLocationsToValues', function () {
    it('should return values from valid coordinates', function () {
        assert.deepEqual(validSymbolCoordinatesAndSymbolLocationsToValues( 
            [
                {coordinate: [4, 2], value: 46},
                {coordinate: [6, 0], value: 114},
                {coordinate: [8, 2], value: 201}
            ],
            [
                [4,2],
                [8,2],
                [12,9]
            ]
        ), { values: [
            46,
            201
        ]});
    });
    it('should return nothing with no coordinates', function () {
        assert.deepEqual(validSymbolCoordinatesAndSymbolLocationsToValues([], []), { values: [] });
    });
});

const { findDualValidSymbolCoordinates } = require('./3-parttwo'); // adjust path as needed
describe('findDualValidSymbolCoordinates', function () {
    it('should return duplicate from valid coordinates', function () {
        assert.deepEqual(findDualValidSymbolCoordinates( 
            [
                {coordinate: [4, 2], value: 46},
                {coordinate: [4, 2], value: 114},

                {coordinate: [8, 2], value: 201},
                
                {coordinate: [10, 2], value: 305},
                {coordinate: [10, 2], value: 304},
                {coordinate: [10, 2], value: 309},

            ]
        ), [
            {coordinate: [4, 2], value: 46 * 114},
        ]);
    
    });
    it('should return nothing with no coordinates', function () {
        assert.deepEqual(findDualValidSymbolCoordinates([]), []);
    });
});

//External AoC tests
const { exec } = require('child_process');

const testable = [
    ["3.js", "test", 4361],
    ["3-parttwo.js", "test-parttwo", 467835]
];

for (const [scriptname, filename, correctoutput] of testable) {
    describe("AoC test block", function () {
        it("Should return " + correctoutput + " for `" + scriptname + " " + filename + "`", function () {
            exec(`node ${scriptname} ${filename}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }

                const outputLines = stdout.split('\n');
                const lastLine = outputLines[outputLines.length - 2]; // -2 because the last element is an empty string due to split

                const outputValue = parseInt(lastLine, 10);

                try {
                    assert.strictEqual(outputValue, correctoutput);
                } catch (error) {
                    console.error("node ${scriptname} ${filename}");
                    console.error('Test failed:', error);
                }
            });
        });
    });
}
