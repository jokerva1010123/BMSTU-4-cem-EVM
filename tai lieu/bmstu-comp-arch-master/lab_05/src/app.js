const express = require("express");
const path = require("path");
const body_parser = require("body-parser");

const controllers = require("./controllers");
const router = require("./router");

const PAGES_FOLDER = "public";

const port = process.env.PORT | 3000;

const app = express();

// заголовки в ответ клиенту
app.use(controllers.set_headers);

app.use(body_parser.json());
//app.use(body_parser.urlencoded({ extended: false }))
app.use(controllers.logger);
app.use(express.static(path.join(__dirname, "..", PAGES_FOLDER)));
app.use(body_parser.urlencoded({ extended: true }));

app.use(router);

app.listen(port);
console.log(`Running on port ${port}`);
