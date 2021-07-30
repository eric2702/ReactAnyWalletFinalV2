const router = require("express").Router();
const authorization = require("../middleware/authorization");
const dashboardController = require("../controllers/dashboard");

router.get("/", authorization, dashboardController.getRoot);
router.post("/", authorization, dashboardController.postTransaction);
router.get("/user_id", authorization, dashboardController.getUserId);
router.get("/get_trans", authorization, dashboardController.getTransaction);
router.get(
  "/del_trans/:transaction_id",
  authorization,
  dashboardController.postDelete
);
router.get(
  "/edit_trans/:transaction_id",
  authorization,
  dashboardController.getEditTransaction
);
router.post(
  "/edit_trans/submit",
  authorization,
  dashboardController.postEditTransaction
);
router.get("/get_years", authorization, dashboardController.getYears);

module.exports = router;
