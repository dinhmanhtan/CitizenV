const Auth = require("../Models/Auth");

module.exports = async function (req, res, next) {
  // if (req.authId === "00") {
  //   return next();
  // }

  if (req.body.state === false) {
    return next();
  }

  let isCheckTime = true;

  const requestTime = new Date(req.body.deadTime);
  const deadTime = new Date(req.deadTime);

  if (req.authId === "00") {
    if (requestTime.getTime() < Date.now()) {
      isCheckTime = false
    }
  }
  else if (requestTime.getTime() > deadTime.getTime() || requestTime.getTime() < Date.now()) {
    isCheckTime = false
  }

  if (!isCheckTime) {
    const err = new Error(`Vượt mức cho phép`);
    err.statusCode = 403;
    return next(err);
  } else {
    req.requestTime = requestTime;
    return next();
  }
};
