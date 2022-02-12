"use strict";

let cnt = 0;

const TIME1 = 2000;
const TIME2 = 1000;
const LIMIT1 = 10;
const LIMIT2 = 20;

function counter(limit, time, handler) {
    if (cnt < limit) {
        cnt++;
        console.log(cnt);
        setTimeout(counter.bind(null, limit, time, handler), time);
    } else {
        handler();
    }
}

function run() {
    console.log("\n\n\nTIMERS!");
    cnt = 0;
    counter(LIMIT1, TIME1, counter.bind(null, LIMIT2, TIME2, run));
}

module.exports.run = run;
