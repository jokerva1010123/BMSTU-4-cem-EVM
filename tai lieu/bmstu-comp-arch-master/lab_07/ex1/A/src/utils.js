"use strict";

const fs = require("fs");
const path = require("path");

const DB_FILE_FOLDER = path.join(__dirname, "..", "meta");
const DB_FILE = path.join(DB_FILE_FOLDER, "db.txt");


if (!fs.existsSync(DB_FILE_FOLDER))
    fs.mkdirSync(DB_FILE_FOLDER);

if (!fs.existsSync(DB_FILE))
    fs.writeFileSync(DB_FILE, JSON.stringify([]));

const db = JSON.parse(fs.readFileSync(DB_FILE));

console.log(db);

module.exports.get = (name) => {
    return db.find(car => car.name === name);
}

module.exports.put = (car) => {
    db.push(car);
    fs.writeFileSync(DB_FILE, JSON.stringify(db));
}
