const Auth = require("../Models/Auth");

module.exports = async function (req, res, next) {
  if (req.authId === "00") {
    return next();
  }

  let isCheckTime = false;

  console.log(req.deadTime, "Checking");
  const deadTime = new Date(req.deadTime);
  const startTime = new Date(req.startTime);

  if (deadTime.getTime() > Date.now() && Date.now() > startTime.getTime()) isCheckTime = true;

  if (!isCheckTime) {
    const err = new Error("Hết thời gian quyền thêm người hoặc chưa đến hạn");
    err.statusCode = 403;
    return next(err);
  } else {
    return next();
  }
};
