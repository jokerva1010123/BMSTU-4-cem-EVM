"use strict";

const path = require("path");
const utils = require("./utils");

const MAIN_PAGE = "index.html";
const SECOND_PAGE = "second.html";
const PAGES_FOLDER = "public";
const PATH_TO_MAIN_PAGE = path.join(__dirname, '..', PAGES_FOLDER, MAIN_PAGE);

module.exports.default_controller = (_, res) => res.sendFile(PATH_TO_MAIN_PAGE);

module.exports.set_headers = (_, res, next) => {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

module.exports.add_user = (req, res) => {
    let user = req.body;
    const all_users = get_all();

    const target = all_users.find(value => value.email == user.email && value.phone == user.phone);
    let code = 200;
    let result = "Successfully added!";

    if (!target) {
        utils.append(user);
    } else {
        code = 401;
        result = "Found one!"
        user = target;
    }

    res.status(code).send(JSON.stringify({
        result,
        ...user
    }));
};

const find_user = email => {
    const users = utils.get_all();
    return users.find(user => user.email === email);
}

module.exports.find_user = (req, res) => {
    const target = find_user(req.query.email);
    console.log(req.query);

    if (target) {
        res.status(200).send(JSON.stringify({
            result: "User is found!",
            ...target
        }));
    } else {
        res.status(404).send(JSON.stringify({
            result: "Requested user not found!"
        }));
    }
}

module.exports.logger = (req, _, next) => {
    console.log(req.url, req.method);

    if (req.method === "POST")
        console.log(`body:\n${JSON.stringify(req.body, null, 4)}`);
    else if (req.method === "GET")
        console.log(`query params:\n${JSON.stringify(req.query, null, 4)}`);

    next();
}

module.exports.second_page = (_, res) => {
    res.sendFile(path.join(__dirname, "..", PAGES_FOLDER, SECOND_PAGE));
}
