const router = require("express").Router();
const CitizenController = require("../Controllers/CitizenController");
const checkStatus = require("../Middlewares/checkStatus");
const checkDeadTime = require("../Middlewares/checkDeadTime");

router.put("/:id/changeInfoPerson", CitizenController.changeInfoPerson);
router.get("/:idArea/population", CitizenController.getAllPopulation);
router.delete("/:id/deletePerson", CitizenController.deletePerson);
router.post(
  "/addPerson",
  checkStatus,
  checkDeadTime,
  CitizenController.addPerson
); // B1 vs B2 vs status = true
router.get("/:id/infomation", CitizenController.infoPerson);
router.get("/searchPerson", CitizenController.searchPerson);
router.get("/", CitizenController.homepage);

module.exports = router;
