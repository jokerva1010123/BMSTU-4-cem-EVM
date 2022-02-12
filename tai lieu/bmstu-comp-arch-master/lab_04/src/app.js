const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const default_post = require("./controllers").default_post;

const router = require("./router");

const port = process.env.PORT | 3000;
const PAGES_FOLDER = "public";
const MAIN_PAGE = "index.html";
const PATH_TO_MAIN_PAGE = path.join(__dirname, '..', PAGES_FOLDER, MAIN_PAGE);

const app = express();

app.use(express.static(path.join(__dirname, "..", PAGES_FOLDER)));
app.use(body_parser.urlencoded({ extended: false }));
app.use("/task", router);

app.use("/", (req, res) => {
    if (req.method === "GET")
        res.sendFile(PATH_TO_MAIN_PAGE);
    else
        default_post(req, res);
});

app.listen(port);
console.log(`Running on port ${port}`);
