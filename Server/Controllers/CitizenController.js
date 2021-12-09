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
            $regex: `^${idArea}`,
          },
        });

        return res.status(200).json({
          message: "success",
          data: people,
        });
      } else {
        const err = new Error("You dont have permission");
        err.statusCode = 403;
        return next(err);
      }
    } catch (err) {
      // next(err);
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
      // next(err);
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
          message: "Updated",
          data: data,
        })
      )
      .catch((err) => next(err));
  }

  // DELETE api/citizen/:id/deletePerson
  deletePerson(req, res, next) {
    const idPerson = req.params.id;

    Citizen.deleteOne({ _id: idPerson })
      .then(() => res.status(200).json({ message: "deleted" }))
      .catch((err) => next(err));
  }

  // GET api/citizen/searchPerson
  async searchPerson(req, res, next) {
    const query = req.query;
    if (query.name) {
      try {
        const name = query.name;
        const person = await Citizen.find({ name });

        if (!person) {
          return res.status(200).json({ message: "Could not find person" });
        } else {
          return res.status(200).json({
            message: "success",
            data: person,
          });
        }
      } catch (err) {
        return next(err);
      }
    } else {
      return res.status(500).json({
        message: "failer",
      });
    }
  }
}

module.exports = new citizenController();
