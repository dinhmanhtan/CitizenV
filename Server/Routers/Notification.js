const router = require("express").Router();
const NotificationController = require("../Controllers/NotificationController");

router.get('/typeOne', NotificationController.getNotificationsTypeOne);
router.get('/typeTwo', NotificationController.getNotificationsTypeTwo);

module.exports = router;
