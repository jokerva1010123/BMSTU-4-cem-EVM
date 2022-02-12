"use strict";

const readline = require("readline-sync");

const tasks = require("./tasks");

function choose_task() {
    console.log("TASKS:",
        "\n1. Read N and N strings and write to file only strings with even length",
        "\n2. Read strings from file and print only strings with only vowels",
        "\n3. Print content of all files with special extension from folder",
        "\n4. Recursively run folder and print names of files with content less than 10 symbols",
        "\n5. Read N and N filenames and concatenate content in one string and write to another file",
        "\n6. Max depth level of an object",
        "\n7. read from JSON-file. Print branch with max depth",
    )

    const value = readline.questionInt("Enter number of the task (1-7): ");
    if (value > 7 || value < 1)
        throw Error("Bad number!");
    return value;
}

function main() {
    const choice = choose_task();
    tasks.runners[choice - 1]();
}

main();
