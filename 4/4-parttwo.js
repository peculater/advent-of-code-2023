
function buildComparatives(cardString) {
    //split the carstring into game id and numbers, on a colon
    const [gameInfo, numbers] = cardString.split(':');
    //split the game info into dummy data and a game id, on a space
    const gameId = parseInt(gameInfo.split(/\s+/)[1]);
    //split the numbers into winning and our numbers, on a pipe
    const [winningside, ourside] = numbers.split('|');
    //split the winning numbers into an array on any number of spaces, remove empties, cast to numbers
    const winning = winningside.split(/\s+/).filter(Boolean).map(Number);
    //split the our numbers into an array on any number of spaces
    const ours = ourside.split(/\s+/).filter(Boolean).map(Number);

    return { winningNos: winning, ourNos: ours, gameId: gameId }
}

function scoreComparatives(winning, ours) {
    //Huh, Javascript doesn't have a built-in intersect function.
    const winningSet = new Set(winning);
    const ourSet = new Set(ours);
    const intersectionSize = new Set([...winningSet].filter(x => ourSet.has(x))).size;
    return intersectionSize;
}


function main() {
    const fs = require('fs');
    const readline = require('readline');

    const filePath = process.argv[2]; // Get the file path from the command line argument
    const gamecount = [];

    const readInterface = readline.createInterface({
        input: fs.createReadStream(filePath),
        //output: process.stdout,
        console: false
    });

    var lastGameId = 0;
    readInterface.on('line', function (line) {
        const { winningNos, ourNos, gameId } = buildComparatives(line);

        //if gamecount{gameid} is undefined, set it to 1, otherwise increment it for hitting the original
        gamecount[gameId] = gamecount[gameId] ? gamecount[gameId] + 1 : 1;
       
        this_score = scoreComparatives(winningNos, ourNos);

        for (let i = this_score; i > 0; i--) {
            gamecount[gameId + i] = gamecount[gameId + i] ? gamecount[gameId + i] + (gamecount[gameId]) : (gamecount[gameId]);
        }

        lastGameId = gameId;

    });

    readInterface.on('close', function () {

        //add all the values in gamecount from 0 to lastGameId
        var sum = 0;
        for (let i = 1; i <= lastGameId; i++) {
            sum += gamecount[i];
        }

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