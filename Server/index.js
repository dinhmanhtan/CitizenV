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

  socket.on("sendClientData", data => {
    console.log(data);
    const dt = {
      type: 2,
      name: data.name,
      content: "Hoàn thành",
      createdAt : Date.now(),
      idAddress : data.id,
    }

    const parentId = data.id.length === 2 ? '00' : data.id.substring(0, data.id.length - 2);
    console.log(data, parentId)

    socketIO.emit(`sendSubAccountFinish${parentId}`, dt)
    
  })

  socket.on("sendSubNoti", data => {
    console.log(data);
    const dt = {
      type : 3,
      name : data.name,
      content : data.state ? "Mở quyền khai báo" : "Tắt quyền khai báo",
      date : data.deadTime || Date.now(),
      start : data.startTime || Date.now(),
      createdAt : Date.now(), 
    }
    socketIO.emit(`sendNoti${data.subId}`, dt)
  })

  socket.on("sendAllSubNoti", data => {
    socketIO.emit(`sendAllNoti${data.id}`, data)
  })

  // socket.on('sendDataClient', (data) => {
  //   console.log(data.id);
  //   const subId = data.id.substring(0, data.id.length - 2)
  //   socketIO.emit(`getNoti${subId}`, data);
  // })

  socket.on('disconnect', () => {
    console.log("Disconnect" + socket.id);
  })
})