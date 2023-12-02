
//Unit tests
const chai = require('chai');
const assert = chai.assert;

//External AoC tests
const { exec } = require('child_process');

const testable = [
    ["2.js", "test", 8],
    ["2-parttwo.js", "test", 2286]
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
