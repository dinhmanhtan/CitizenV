const bcrypt = require("bcryptjs");
const Auth = require("../Models/Auth");
const jwt = require("jsonwebtoken");

class AuthController {
  // @route GET api/auth/
  // @description  check if user is logged in
  async homepage(req, res) {
    // const query = req.query;
    // if (!query) {
    //   res.json({
    //     q: "123",
    //   });
    // } else {
    //   res.json(query);
    // }

    try {
      const account = await Auth.findOne({ id: req.authId }).select(
        "-password"
      ); // Ko lấy trường password
      if (!account) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
      res.json({ success: true, account });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  //POST api/auth/registerAdmin
  async registerAdmin(req, res, next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const auth = new Auth({
        id: req.body.id,
        name: req.body.name,
        password: hashPassword,
        role: req.body.role, // 0 1 2 3 4
      });
      const newAuth = await auth.save();
      res.status(200).json({
        message: req.authId,
        account: newAuth,
      });
    } catch (err) {
      // err
    }
  }

  //POST api/auth/register
  async register(req, res, next) {
    const id = req.body.id;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      if (
        (req.authId == "00" || id.startsWith(req.authId)) &&
        id.length === req.authId.length + 2
      ) {
        const addr =
          !req.address || req.address === undefined
            ? `${req.name}`
            : `${req.name}-${req.address}`;
        const auth = new Auth({
          id: req.body.id,
          name: req.body.name,
          password: hashPassword,
          role: req.body.role, // 0 1 2 3 4
          address: addr,
        });
        const newAuth = await auth.save();
        res.status(200).json({
          success: true,
          account: newAuth,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "ID không hợp lệ",
        });
      }
    } catch (err) {
      // res.json(err);
      next(err);
    }
  }

  // POST api/auth/login
  async login(req, res, next) {
    try {
      const auth = await Auth.findOne({ id: req.body.id });
      if (!auth) {
        const err = new Error("Username or password is incorrect");
        err.statusCode = 400;
        return next(err);
      }
      const checkPassword = await bcrypt.compare(
        req.body.password,
        auth.password
      );
      if (!checkPassword) {
        const err = new Error("Username or password is incorrect");
        err.statusCode = 400;
        return next(err);
      }

      const token = jwt.sign(
        {
          authId: auth.id,
          role: auth.role,
          name: auth.name,
          address: auth.address,
        },
        process.env.TOKEN_SECRET, {
          expiresIn: '2h',
        }
      );

      res.status(200).json({
        status: "success",
        account: {
          token: token,
          id: auth.id,
          name: auth.name,
          role: auth.role,
          address: auth.address,
        },
      });
    } catch (err) {
      //
      res.json(err);
    }
  }


  // DELETE api/auth/logout
  async logout(req, res, next) {}

  // DELETE api/auth/:subId/deleteAccount
  async destroy(req, res, next) {
    const subId = req.params.subId;
    if (
      (req.authId === "00" || subId.startsWith(req.authId)) &&
      subId.length === req.authId.length + 2
    ) {
      try {
        await Auth.deleteMany({
          id: {
            $regex: `^${subId}`,
          },
        });
        res.status(200).json({ success: true });
      } catch (err) {
        next(err);
      }
    } else {
      // const err = new Error("You dont have permission");
      // err.statusCode = 403;
      // next(err);
      res
        .status(403)
        .json({ success: false, message: "You don't have permission" });
    }
  }

  // GET api/auth/:id/getAllSubAccounts
  getAccounts(req, res, next) {
    const idFiled = req.params.id;
    if (req.authId === "00") {
      Auth.find({
        id: {
          $regex: `^[0-9][0-9]$`,
        },
      })
        .then((data) => {
          res.status(200).json({
            success: true,
            account: data,
          });
        })
        .catch((err) => next(err));
    } else if (idFiled.startsWith(req.authId)) {
      Auth.find({
        id: {
          $regex: `^${idFiled}[0-9][0-9]$`, // id gốc 01 -> 01xx
        },
      })
        .then((data) => {
          res.status(200).json({
            success: true,
            account: data,
          });
        })
        .catch((err) => next(err));
    } else {
      const err = new Error("You dont have permission");
      err.statusCode = 403;
      return next(err);
      // next(err);
    }
  }

  //Get api/auth/getSubAccount/:id

  async getSubAccount(req, res, next) {
    const idFiled = req.params.id;
    if (req.role === 0 || idFiled.startsWith(req.authId)) {
      try {
        const subAccount = await Auth.findOne({ id: idFiled }).select(
          "-password"
        ); // Ko lấy trường password
        if (!subAccount) {
          return res
            .status(400)
            .json({ success: false, message: "Account not found" });
        }
        res.json({ success: true, subAccount });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    } else {
      const err = new Error("You dont have permission");
      err.statusCode = 403;
      return next(err);
      // next(err);
    }
  }

  // PATCH api/auth/changePassword/
  async changePassword(req, res, next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashNewPassword = await bcrypt.hash(req.body.password, salt);

      await Auth.updateOne({ id: req.authId }, { password: hashNewPassword });
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  // PATCH api/auth/changeSubPassword/:id
  async changeSubPassword(req, res, next) {
    const idFiled = req.params.id;
    if (
      idFiled.startsWith(req.authId) &&
      idFiled.length === req.authId.length + 2
    ) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashNewPassword = await bcrypt.hash(req.body.password, salt);

        await Auth.updateOne({ id: idFiled }, { password: hashNewPassword });
        res.status(200).json({ success: true });
      } catch (err) {
        console.log(err);
        next(err);
      }
    } else {
      res
        .status(403)
        .json({ success: false, message: "You don't have permission" });
    }
  }

  // PATCH api/auth/changeStatus
  async changeStatus(req, res, next) {
    try {
      if (req.body.state === false) {
        if (req.authId === "00") {
          await Auth.updateMany({}, { state: false, dateTime: Date.now() });
        } else {
          await Auth.updateMany(
            {
              id: {
                $regex: `^${req.authId}`,
              },
            },
            { state: false, dateTime: Date.now() }
          );
        }
      } else {
        console.log(req.requestTime);
        await Auth.updateOne(
          {
            id: {
              $regex: `^${req.authId}[0-9]`,
            },
          },
          { state: req.body.state, deadTime: req.requestTime }
        );
      }

      res.status(200).json({
        message: "sucessfully",
      });
    } catch (err) {
      next(err);
    }
  }

  changeProgress (req, res, next) {
    Auth.updateOne( {id : req.authId}, { progress : req.body.progress})
      .then( () => {
        return res.status(200).json({
          success: true
        })
      })
      .catch (err => {
        next(err)
      })
  }
}

module.exports = new AuthController();
