# [Node.js](https://nodejs.org/en/) Install
```sh
sudo apt update
sudo apt install -y nodejs npm
```

# Installation
```sh
git clone https://github.com/tutagebo/PairwiseAlignmentTool.git
npm link
```

# Usage
```sh
seqp [options] [base1] [base2]
```
* help
```sh
seqp -h
Usage: seq [options]

A pairwise alignment tool

Options:
  -V, --version         output the version number
  -o, --output <file>   select output file
  -t, --score-table     output finally scores table
  -f, --foutput <file>  select input file and force overwrite
  -i, --input <file>    select input file
  -h, --help            display help for command
```
