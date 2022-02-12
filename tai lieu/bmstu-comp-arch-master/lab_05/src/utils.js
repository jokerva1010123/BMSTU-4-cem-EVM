const path = require("path");
const fs = require("fs");

const DB_FILE = path.join(__dirname, "..", "temp", "db.txt");

get_all = () => {
    return JSON.parse(fs.readFileSync(DB_FILE));
}

module.exports.append = (object) => {
    const objects = get_all();
    objects.push(object);
    fs.writeFileSync(DB_FILE, JSON.stringify(objects));
}

module.exports.get_all = get_all;
