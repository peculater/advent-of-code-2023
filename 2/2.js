
function main() {
    // Open the file called 'input' and read the content one line at a time
    const fs = require('fs');
    const readline = require('readline');

    const filePath = process.argv[2]; // Get the file path from the command line argument


    var sum = 0;

    const readInterface = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        console: false
    });

    readInterface.on('line', function (line) {
        //initialize a dict of 'red', 'blue', and 'green' each set to 0
        const maxes = {
            red: 0,
            blue: 0,
            green: 0
        };
        //split the line on a colon
        const games = line.split(':');
        //split the first part on spaces, convert to int
        const gameid = parseInt(games[0].split(' ')[1])
        //split the second part on semicolons
        const subsets = games[1].split(';');
        //split each of those lines on commas
        const colordraws = subsets.flatMap((line) => line.split(','));
        //iterate over each array element
        colordraws.forEach((element) => {
            //remove leading and trailing whitespace
            element = element.trim();
            //split each element on a space
            const this_colordraw = element.split(' ');
            //ensure that the value of maxes that corresponds to the color is set to the max of the current value and the value of the draw
            maxes[this_colordraw[1]] = Math.max(maxes[this_colordraw[1]], parseInt(this_colordraw[0]));

            //maxes[this_colordraw[1]] = Math.max(maxes[this_colordraw[1]], parseInt(this_colordraw[0]));


        });
        // 12 red cubes, 13 green cubes, and 14 blue cubes
        if (maxes.red <= 12 && maxes.green <= 13 && maxes.blue <= 14) {
            sum += gameid
        }

    });
    readInterface.on('close', function () {
        console.log("End sum");
        console.log(sum);
    });
}

if (require.main === module) {
    main();
}

