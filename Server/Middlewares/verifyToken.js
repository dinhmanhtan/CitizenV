const jwt = require("jsonwebtoken");
const Auth = require("../Models/Auth")

module.exports = async function (req, res, next) {
  const Authorization = req.headers["authorization"];

  if (!Authorization) {
    // error
    const err = new Error("Invalid authorization");
    err.statusCode = 401;
    return next(err);
  }

  const token = Authorization && Authorization.split(" ")[1];
  try {
    const { authId, role, name, address } = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
    );
    
    const authData = await Auth.findOne({ id: authId});
    //  console.log(deadTime);
  
    req.authId = authId;
    req.role = role;
    req.state = authData.state;
    req.deadTime = authData.deadTime;
    req.startTime = authData.startTime;
    req.name = name;
    req.address = address;
    return next();
  }
  catch (err) {
    err.statusCode = 403;
    return next(err);
  }
};
