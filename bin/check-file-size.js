const fs = require('fs');
const chalk = require('chalk');
const prettyBytes = require('pretty-bytes');

const MAX_BYTES = 13312;
const filename = './dist/zipped/game.zip';

function getFilesizeInBytes(filename) {
    return fs.statSync(filename).size;
}

function fileIsUnderMaxSize(fileSize) {
    return fileSize <= MAX_BYTES;
}

fileSize = getFilesizeInBytes(filename);
fileSizeDifference = Math.abs(MAX_BYTES - fileSize);

if (fileIsUnderMaxSize(fileSize)) {
    console.log('\n');
    console.log(chalk.green.bold(prettyBytes(fileSize)));
    console.log('\n');
    process.exit(0);
} else {
    console.log(chalk.red(prettyBytes(fileSize)));
    process.exit(0);
}

