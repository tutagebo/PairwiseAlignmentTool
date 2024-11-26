#!/usr/bin/env node
const { program } = require('commander');
const path = require('path');
const Calculator = require('./blosum').Calculator;
const fs = require("fs");

program
    .name('seq')
    .description('A pairwise alignment tool')
    .version('PairwiseAlignmentTool - 1.0.0');

program
    .option('-o, --output <file>', 'select output file')
    .option('-t, --score-table', 'output finally scores table')
    .option('-f, --foutput <file>', 'select input file and force overwrite')
    .option('-i, --input <file>', 'select input file');

program.parse(process.argv);

program
    .arguments('[base1] [base2]')
    .action(()=>{
        const options = program.opts();
        let base1, base2;
        if(options["input"]){
            /** @type {string} */
            const inputFileText = String(fs.readFileSync(options.input));
            [ base1, base2 ] = inputFileText.split(/\n/);
        }else{
            base1 = program.args[0];
            base2 = program.args[1];
        }
        const pair = new Calculator(base1,base2);
        pair.createTable(true);
        const outputText = [pair.complete1, pair.complete2].join("\n")+"\n";
        console.log("result:");
        console.log(outputText);
        if(options["output"]){
            const dir = path.dirname(options.output);
            if (!fs.existsSync(dir)) {
                console.error(`Error: Directory "${dir}" does not exist.`);
                process.exit(1);
            }
            if(fs.existsSync(options.output)){
                console.error(`Error: "${options.output}" is already exists. Use different name or Specify options.`)
                process.exit(1);
            }
            fs.writeFileSync(options.output, outputText);
        }else if(options["foutput"]){
            const dir = path.dirname(options.foutput);
            if (!options.foutput) {
                console.error('Error: File path is not defined');
                process.exit(1);
            }
            if (!fs.existsSync(dir)) {
                console.error(`Error: Directory "${dir}" does not exist.`);
                process.exit(1);
            }
            fs.writeFileSync(options.foutput, outputText);
        }
        if(options["scoreTable"]){
            console.log("Score Table:")
            const scoreTableText = pair.printTable();
            console.log(scoreTableText);
        }
    })

program.parse(process.argv);
