//========= MORE THAN TWO USERS CONNECTION===========
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "http://127.0.0.1/:5173" },
});
const PORT = 3001 || process.env.PORT;
io.on("connection", (socket) => {
  console.log("Connected");

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

function error(err, req, res, next) {
  if (!test) console.error(err.stack);

  // respond with 500 "Internal Server Error".
  res.status(500);
  res.send("Internal Server Error");
}
app.use(error);
server.listen(PORT, () => {
  console.log("listening on Port 3001");
});
