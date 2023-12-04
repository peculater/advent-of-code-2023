
//Unit tests
const chai = require('chai');
const assert = chai.assert;
const {
    buildComparatives,
    scoreComparatives
} = require('./4'); // adjust path as needed

describe('buildComparatives', function () {
    it('should return two arrays from string', function () {
        assert.deepEqual(buildComparatives('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'), { winningNos: [41, 48, 83, 86, 17], ourNos: [83, 86, 6, 31, 17, 9, 48, 53] });
    });
});

describe('scoreComparatives', function () {
    it('should score 8 for Card 1 of the example', function () {
        assert.deepEqual(scoreComparatives([41, 48, 83, 86, 17], [83, 86, 6, 31, 17, 9, 48, 53]), 8);
    });
    it('should score 1 for 1 match', function () {
        assert.deepEqual(scoreComparatives([41, 48, 83, 86, 17], [48]), 1);
    });
    it('should score 0 for 0 match', function () {
        assert.deepEqual(scoreComparatives([41, 48, 83, 86, 17], [2]), 0);
    });
});

//External AoC tests
const { exec } = require('child_process');

const testable = [
    ["4.js", "test", 13],
    ["4-parttwo.js", "test-parttwo", 30]
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
