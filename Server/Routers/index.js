const Auth = require('./Auth')
const Citizen = require('./Citizen');
const verifyToken = require('../Middlewares/verifyToken')

function Route(app) {
    app.use('/api/auth', Auth);

    app.use('/api/citizen',verifyToken , Citizen);
}

module.exports = Route;