const Notifications = require("../Models/Notification");


class notificationController {
    getNotificationsTypeOne(req, res, next) {
        const subStr = req.authId.substring(0, req.authId.length - 2);
        const typeThree = Notifications.find({
            type : 3,
            subId : req.authId,
        })
        .sort({
            createdAt : 1
        })

        const typeOne =  Notifications.find({
            type: 1,
            idAddress : subStr,
        })
        .sort({
            createdAt : 1
        })

        Promise.all([ typeOne, typeThree ])
            .then(([dataOne, dataThree]) => {
                const data = [...dataOne, ...dataThree];
                res.json({
                    success : true,
                    data: data,
                })
            })
            .catch( err => next(err));

            // .sort({
            //     createdAt : -1
            // })
            // .then( (data) => {
            //     res.json({
            //         success : true,
            //         data: data,
            //     })
            // })
            // .catch(err => next(err)) 
    }

    getNotificationsTypeTwo(req, res, next) {
        Notifications.find({
            type: 2,
            idAddress : {
                $regex : `^${req.authId}[0-9][0-9]$`,
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