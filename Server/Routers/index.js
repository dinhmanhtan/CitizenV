const Auth = require('./Auth')
const Citizen = require('./Citizen');
const Notifications = require('./Notification');
const verifyToken = require('../Middlewares/verifyToken')

function Route(app) {
    app.use('/api/auth', Auth);

    app.use('/api/citizen',verifyToken , Citizen);

    app.use('/api/notify', verifyToken, Notifications);
}

module.exports = Route;