const fs = require('fs');
const archiver = require('archiver');
const mkdirp = require('mkdirp');
const path = require('path');

const distDir = process.cwd() + '/dist';
const zipDir = path.join(distDir, 'zipped');

mkdirp.sync(zipDir);

const output = fs.createWriteStream(distDir + '/zipped/game.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);
archive.file(distDir + '/inlined/index.html', { name: 'index.html' });

archive.finalize();
