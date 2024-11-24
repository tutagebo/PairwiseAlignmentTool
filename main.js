const { program } = require('commander');
const fs = require("fs");

program
    .name('seq')
    .description('A pairwise alignment tool')
    .version('1.0.0');

program
    .option('-t, --score-table', 'output finally scores table')
