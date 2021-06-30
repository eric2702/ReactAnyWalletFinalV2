const router = require("express").Router();
// const pool = require("../db");
const authorization = require("../middleware/authorization");
const dashboardController = require("../controllers/dashboard");

router.get("/", authorization, dashboardController.getRoot);

module.exports = router;
