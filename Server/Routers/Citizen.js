const router = require("express").Router();
const CitizenController = require("../Controllers/CitizenController");
const checkStatus = require("../Middlewares/checkStatus");
const checkDeadTime = require("../Middlewares/checkDeadTime");
const verifyToken = require("../Middlewares/verifyToken");

router.put(
  "/:id/changeInfoPerson",
  verifyToken,
  CitizenController.changeInfoPerson
);
router.get(
  "/:idArea/population",
  verifyToken,
  CitizenController.getAllPopulation
);
router.delete("/:id/deletePerson", verifyToken, CitizenController.deletePerson);
router.post(
  "/addPerson",
  checkStatus,
  checkDeadTime,
  CitizenController.addPerson
); // B1 vs B2 vs status = true
router.get("/:id/infomation", verifyToken, CitizenController.infoPerson);
router.post("/searchPerson", verifyToken, CitizenController.searchPerson);
router.get("/", CitizenController.homepage);

module.exports = router;
