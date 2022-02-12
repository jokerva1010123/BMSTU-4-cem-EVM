const Router = require("express").Router;

const controllers = require("./controllers");

const router = Router();

router.post("/calc", controllers.find_min);
router.post("/array", controllers.get_array_elem);
router.post("/findall", controllers.find_all);
router.post("/genform", controllers.form_generator);

module.exports = router;
