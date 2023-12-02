const { exec } = require('child_process');
const assert = require('assert');

const testable = [
    ["1.js", "test", 142],
    ["1-parttwo.js", "test-parttwo", 281]
];

for (const [scriptname, filename, correctoutput] of testable) {

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
            console.log('Test passed!');
        } catch (error) {
            console.error("node ${scriptname} ${filename}");
            console.error('Test failed:', error);
        }
    });
}
