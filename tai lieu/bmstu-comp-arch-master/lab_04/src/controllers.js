const path = require("path");
const fs = require("fs");

const FILE_WITH_ARRAY = path.join(__dirname, "..", "data", "array.json");

module.exports.find_min = (req, res) => {
    // for get request we use req.query.<param_name>!
    let a = req.body.a;
    let b = req.body.b;
    let c = req.body.c;

    if (isNaN(a) || isNaN(b) || isNaN(c))
        res.status(400).send("Bad input!");

    a = parseFloat(a);
    b = parseFloat(b);
    c = parseFloat(c);

    res.status(200).send(Math.max(a, b, c).toString());
}

module.exports.get_array_elem = (req, res) => {
    let index;
    try {
        index = parseInt(req.body.index.toString().trim());
        if (index.toString().length !== req.body.index.trim().length)
            throw Error("");
        index -= 1;
    } catch(_) {
        res.status(400).send("Bad input! Can't convert index to number!");
        return;
    }

    const array = JSON.parse(fs.readFileSync(FILE_WITH_ARRAY));

    if (index < 0 || index >= array.length)
        res.status(400).send("Bad request, out of range");
    else
        res.status(200).send(JSON.stringify(array[index]));
};

module.exports.find_all = (req, res) => {
    let a = req.body.a;
    let b = req.body.b;
    let c = req.body.c;

    try {
        a = parseInt(a);
        b = parseInt(b);
        c = parseInt(c);
        if (c <= 0)
            throw Error("");
    } catch(_) {
        res.status(400).send("Bad input! Can't convert args to number!");
        return;
    }

    const all_numbers = [];
    const start = a % c === 0 ? a : a + (c - a % c);
    for (let num = start; num <= b; num += c)
        all_numbers.push(num);

    res.status(200).send(JSON.stringify(all_numbers));
};

function generate_form_header(address) {
    return `<form method="POST" action="${address}">`;
};

function generate_form(fields) {
    let content = "";

    for (const field of fields)
        content += ` <label for="${field}">Enter ${field}:</label>
<input type="text" name="${field}">
<br>`;
    content += `<input type="submit">`;
    content += "</form>";

    return content;
}

function generate_page(fields, address) {
    content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab 04</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body>`;
    content += generate_form_header(address);
    content += generate_form(fields);
    content += "</body></html>";
    return content;
}

module.exports.form_generator = (req, res) => {
    const fields = req.body.fields;
    let address = req.body.address;

    if (address.charAt(0) !== '/')
        address = '/' + address;
    
    const html_code = generate_page(fields.split(' '), address);
    res.send(html_code);
};

module.exports.default_post = (req, res) => {
    const body = JSON.stringify(req.body);
    res.status(200).send(`Address: ${req.url};\nBody: ${body}`);
}
