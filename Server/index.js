const express = require("express");
const app = express();
const Route = require("./Routers");
const db = require("./Config/db");
const cors = require("cors");

const errorHandler = require("./Middlewares/errorHandler");
require("dotenv").config();

db.connect();

const PORT = 5555;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

Route(app);
app.all("*", (req, res, next) => {
  const err = new Error("The route can not be found");
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, console.log("App listening on port " + PORT));
