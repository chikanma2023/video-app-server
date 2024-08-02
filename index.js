const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // Adjust CORS as needed
  transports: ["websocket", "polling"],
});

io.on("connection", (socket) => {
  console.log("Connected");

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

// Define a default route for a health check
app.get("/", (req, res) => {
  res.status(200).send("Server is running successfully!");
});

module.exports = (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    return app(req, res);
  } else {
    res.status(404).send("Not Found");
  }
};

// Keep the server alive for WebSocket connections
const keepAlive = setInterval(() => {
  io.emit("ping");
}, 20000);

process.on("exit", () => clearInterval(keepAlive));

// //========= MORE THAN TWO USERS CONNECTION===========
// const express = require("express");
// const cors = require("cors");
// const app = express();
// app.use(cors());
// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//   cors: { origin: "*" },
// });
// const PORT = 3001 || process.env.PORT;
// io.on("connection", (socket) => {
//   console.log("Connected");

//   socket.on("message", (message) => {
//     socket.broadcast.emit("message", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("Disconnected");
//   });
// });

// function error(err, req, res, next) {
//   if (!test) console.error(err.stack);

//   // respond with 500 "Internal Server Error".
//   res.status(500);
//   res.send("Internal Server Error");
// }
// app.use(error);
// server.listen(PORT, () => {
//   console.log("listening on Port 3001");
// });
