
function buildComparatives(cardString) {
    //split the carstring into game id and numbers, on a colon
    const [gameId, numbers] = cardString.split(':');
    //split the numbers into winning and our numbers, on a pipe
    const [winningside, ourside] = numbers.split('|');
    //split the winning numbers into an array on any number of spaces, remove empties, cast to numbers
    const winning = winningside.split(/\s+/).filter(Boolean).map(Number);
    //split the our numbers into an array on any number of spaces
    const ours = ourside.split(/\s+/).filter(Boolean).map(Number);

    return { winningNos: winning, ourNos: ours }
}

function scoreComparatives(winning, ours) {
    ourSet = new Set(ours);
    numberOfMatches = 0;
    for (let i = 0; i < winning.length; i++) {
        //if ourset contains a winning number, increment number of matches
        if (ourSet.has(winning[i])) {
            numberOfMatches++;
        }
    }
    if (numberOfMatches == 0) {
        return 0;
    }
    return 2 ** (numberOfMatches - 1);
}


function main() {
    const fs = require('fs');
    const readline = require('readline');

    const filePath = process.argv[2]; // Get the file path from the command line argument
    var sum = 0;

    const readInterface = readline.createInterface({
        input: fs.createReadStream(filePath),
        //output: process.stdout,
        console: false
    });

    readInterface.on('line', function (line) {
        const { winningNos, ourNos } = buildComparatives(line);
        sum += scoreComparatives(winningNos, ourNos);
    });

    readInterface.on('close', function () {

        console.log("End sum");
        console.log(sum);
    });
}

if (require.main === module) {
    main();
}
module.exports = {
    buildComparatives,
    scoreComparatives
};