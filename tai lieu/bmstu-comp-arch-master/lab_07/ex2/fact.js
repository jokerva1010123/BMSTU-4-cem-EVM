"use strict";

const fact = (num) => {
    let res = 1;

    for (let i = 2; i <= num; i++)
        res *= i;

    return res;
}

console.log(fact(process.argv[2]));
