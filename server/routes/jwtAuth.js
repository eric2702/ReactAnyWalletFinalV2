const router = require("express").Router();
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const authController = require("../controllers/auth");

//register

router.post("/register", validInfo, authController.postRegister);

router.post("/login", validInfo, authController.postLogin);

router.get("/is-verify", authorization, authController.getIsVerify);

module.exports = router;
