const Auth = require("../Models/Auth");

module.exports = async function (req, res, next) {
  if (req.authId === "00") {
    return next();
  }

  let isCheckTime = true;

  console.log(req.deadTime, "Checking");
  const deadTime = new Date(req.deadTime);

  if (deadTime.getTime() < Date.now()) isCheckTime = false;

  if (!isCheckTime) {
    const err = new Error("Hết thời gian quyền thêm người");
    err.statusCode = 403;
    return next(err);
  } else {
    return next();
  }
};
