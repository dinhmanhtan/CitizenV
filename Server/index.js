const express = require("express");
const app = express();
const http = require("http");
const Route = require("./Routers");
const db = require("./Config/db");
const cors = require("cors");
const server = http.createServer(app);

const { Server } = require("socket.io")

const socketIO = new Server(server, {
  cors: {
    origin: "*",
  }
})


const errorHandler = require("./Middlewares/errorHandler");
require("dotenv").config();

db.connect();

const PORT = 5555;
server.listen(PORT,() => console.log("App listening on port " + PORT));

app.use((req, res, next) => {
  req.io = socketIO;
  return next();
})
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



socketIO.on("connection", (socket) => {
  console.log("Connect " + socket.id);

  socket.emit("getId", socket.id);

  socket.on('disconnect', () => {
    console.log("Disconnect" + socket.id);
  })
})