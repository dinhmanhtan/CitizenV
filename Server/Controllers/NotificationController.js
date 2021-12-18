const Notifications = require("../Models/Notification");


class notificationController {
    getNotificationsTypeOne(req, res, next) {
        const subStr = req.authId.substring(0, req.authId.length - 2);
        Notifications.find({
            type: 1,
            idAddress : subStr,
        })
            .then( (data) => {
                res.json({
                    success : true,
                    data: data,
                })
            })
            .catch(err => next(err)) 
    }

    getNotificationsTypeTwo(req, res, next) {
        Notifications.find({
            type: 2,
            idAddress : {
                $regex : `${req.authId}[0-9][0-9]$`,
            }
        })
            .then( (data) => {
                res.json({
                    success : true,
                    data: data,
                })
            })
            .catch(err => next(err)) 
    }
}

module.exports = new notificationController();