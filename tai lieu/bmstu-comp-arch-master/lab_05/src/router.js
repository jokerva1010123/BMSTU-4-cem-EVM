"use strict";

const express = require("express");
const controllers = require("./controllers");

const router = express.Router();

router.get("/second-page", controllers.second_page)
router.post("/user", controllers.add_user);
router.get("/search", controllers.find_user)
router.get("/", controllers.default_controller);

module.exports = router;
