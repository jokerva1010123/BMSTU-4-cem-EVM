"use strict";

const kids = require("./kids");
const students = require("./students");
const points = require("./points");

function main() {
    console.log("KIDS TASK:\n\n\n");
    kids.run_kids();
    console.log("\n\n\n\nSTUDENTS TASK:\n\n\n");
    students.run_students();
    console.log("\n\n\n\nPOINTS TASK:\n\n\n");
    points.run_points();
}

main();
