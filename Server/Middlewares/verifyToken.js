const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const Authorization = req.headers["authorization"];

  if (!Authorization) {
    // error
    const err = new Error("Invalid authorization");
    err.statusCode = 401;
    return next(err);
  }

  const token = Authorization && Authorization.split(" ")[1];
  const { authId, role, state, deadTime } = jwt.verify(
    token,
    process.env.TOKEN_SECRET
  );

  //  console.log(deadTime);

  req.authId = authId;
  req.role = role;
  req.state = state;
  req.deadTime = deadTime;
  next();
};
