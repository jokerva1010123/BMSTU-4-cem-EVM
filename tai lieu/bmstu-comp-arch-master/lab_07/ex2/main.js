"use strict";

const exec = require("child_process").execSync;


const fact = (num) => {
    const value = exec(`node fact.js ${num}`);
    return parseInt(value);
}

const array = process.argv.slice(2, process.argc).map(num => parseInt(num));
for (const number of array)
    console.log(`fact(${number}) = ${fact(number)}`);
