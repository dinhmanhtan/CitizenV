const Citizen = require("../Models/Citizen");

class citizenController {
  // GET /api/citizen/
  homepage(req, res, next) {
    const query = req.query;
    if (!query) {
      res.json({ message: "aabc" });
    } else {
      res.json(query);
    }
  }

  // GET /api/citizen/:idArea/population
  async getAllPopulation(req, res, next) {
    const idArea = req.params.idArea;
    try {
      if (
        (idArea.length % 2 === 0 && idArea.startsWith(req.authId)) ||
        req.authId === "00"
      ) {
        const people = await Citizen.find({
          idAddress: {
            $regex: idArea !== "00" ? `^${idArea}` : `^0`,
          },
        });

        return res.status(200).json({
          success: true,
          data: people,
        });
      } else {
        // const err = new Error("You dont have permission");
        // err.statusCode = 403;
        // return next(err);
        return res.status(403).json({
          success: false,
          message: "You dont have permission",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // GET /api/citizen/:id/infomation
  async infoPerson(req, res, next) {
    const idPerson = req.params.id;
    try {
      const person = await Citizen.findById(idPerson);

      if (person.idAddress.startsWith(req.authId) || req.authId === "00") {
        return res.status(200).json({
          message: "success",
          data: person,
        });
      } else {
        const err = new Error("You dont have permission");
        err.statusCode = 403;
        return next(err);
      }
    } catch (err) {
      next(err);
    }
  }

  // POST api/citizen/addPerson
  async addPerson(req, res, next) {
    const person = new Citizen(req.body);

    try {
      const newPerson = await person.save();
      res.status(200).json({
        message: "success",
        data: newPerson,
      });

      req.io.on("connection", (socket) => {
        console.log("Connect " + socket.id);

        socket.emit("getId", socket.id);

        socket.on("sendDataClient", (data) => {
          console.log("data");
          req.io.emit("getNoti", data);
        });

        socket.on("disconnect", () => {
          console.log("Disconnect" + socket.id);
        });
      });
    } catch (err) {
      return next(err);
    }
  }

  // PUT api/citizen/:id/changeInfoPerson
  changeInfoPerson(req, res, next) {
    const idPerson = req.params.id;

    Citizen.updateOne({ _id: idPerson }, req.body)
      .then((data) =>
        res.status(200).json({
          message: "success",
          data: data,
        })
      )
      .catch((err) => next(err));
  }

  // DELETE api/citizen/:id/deletePerson
  deletePerson(req, res, next) {
    const idPerson = req.params.id;

    Citizen.deleteOne({ _id: idPerson })
      .then(() => res.status(200).json({ success: true }))
      .catch((err) => next(err));
  }

  // POST api/citizen/searchPerson
  async searchPerson(req, res, next) {
    const query = req.body;
    if (query.name) {
      try {
        const name = query.name;
        const people = await Citizen.find({
          idAddress: {
            $regex: req.authId !== "00" ? `^${req.authId}` : `^0`,
          },
        });

        const person =
          people &&
          people.filter((person) =>
            person.name.toLowerCase().includes(name.toLowerCase())
          );

        if (!person) {
          return res
            .status(200)
            .json({ success: false, message: "Could not find person" });
        } else {
          return res.status(200).json({
            success: true,
            data: person,
          });
        }
      } catch (err) {
        return next(err);
      }
    } else {
      return res.status(500).json({
        message: "failed",
      });
    }
  }
}

module.exports = new citizenController();
