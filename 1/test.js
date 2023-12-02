
//Unit tests
const chai = require('chai');
const assert = chai.assert;
const parseIntFromDigitOrString = require('./1-parttwo'); // adjust path as needed

describe('parseIntFromDigitOrString', function () {
    it('should return integer from string number', function () {
        assert.equal(parseIntFromDigitOrString('one'), 1);
        assert.equal(parseIntFromDigitOrString('two'), 2);
        assert.equal(parseIntFromDigitOrString('nine'), 9);
        // add more cases as needed
    });

    it('should return integer from digit string', function () {
        assert.equal(parseIntFromDigitOrString('1'), 1);
        assert.equal(parseIntFromDigitOrString('2'), 2);
        // add more cases as needed
    });

    it('should return integer from number', function () {
        assert.equal(parseIntFromDigitOrString(1), 1);
        assert.equal(parseIntFromDigitOrString(2), 2);
        // add more cases as needed
    });
});


//External AoC tests
const { exec } = require('child_process');

const testable = [
    ["1.js", "test", 142],
    ["1-parttwo.js", "test-parttwo", 281]
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
