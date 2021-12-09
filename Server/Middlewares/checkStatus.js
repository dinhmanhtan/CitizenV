const Auth = require("../Models/Auth");

module.exports = async function (req, res, next) {
  try {
    if (req.authId === "00") {
      return next();
    }

    let parentId = "";
    let isCheck = true;

    const adminAuth = await Auth.findOne({ id: "00" });
    if (adminAuth.state === false) {
      const err = new Error("You are not allowed to access");
      err.statusCode = 403;
      return next(err);
    }

    for (var i = 0; i < req.role - 1; i++) {
      parentId += req.authId[2 * i] + req.authId[2 * i + 1];
      console.log(parentId);
      const parent = await Auth.findOne({ id: parentId });
      if (parent.state === false) {
        isCheck = false;
        break;
      }
    }

    if (isCheck === false) {
      const err = new Error("You are not allowed to access");
      err.statusCode = 403;
      return next(err);
    } else {
      return next();
    }
  } catch (err) {
    return res.json({ message: err.message });
  }
};
