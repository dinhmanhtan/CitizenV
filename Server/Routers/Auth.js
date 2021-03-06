const router = require("express").Router();
const AuthController = require("../Controllers/AuthController");
const verifyToken = require("../Middlewares/verifyToken");
const checkStatus = require("../Middlewares/checkStatus");
const checkRequestTime = require("../Middlewares/checkRequestTime");

router.delete("/:subId/deleteAccount", verifyToken, AuthController.destroy);

router.patch(
  "/changeStatus/:id",
  verifyToken,
  checkStatus,
  checkRequestTime,
  AuthController.changeSubStatus
);
router.patch(
  "/changeStatus",
  verifyToken,
  checkStatus,
  checkRequestTime,
  AuthController.changeStatus
);
router.patch("/changePassword", verifyToken, AuthController.changePassword);
router.patch(
  "/changeSubPassword/:id",
  verifyToken,
  AuthController.changeSubPassword
);
router.patch("/changeProgress", verifyToken, AuthController.changeProgress);
router.post("/login", AuthController.login);
router.get("/:id/getAllSubAccounts", verifyToken, AuthController.getAccounts);
router.post("/register", verifyToken, AuthController.register);
router.post("/registerAdmin", AuthController.registerAdmin);
router.get("/", verifyToken, AuthController.homepage);
router.get("/getSubAccount/:id", verifyToken, AuthController.getSubAccount);

module.exports = router;
