const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//// set static folder /////
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("first socket!");

  // welcomes the user logging in
  socket.emit("message", "hej o välkommen till shatapp!");

  // displays message for all other users besides the user joining
  socket.broadcast.emit("message", "här är en broadcast till alla");

  // Shows when a user leaves
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the shat");
  });

  // Recieve messages from front-end
  socket.on("shatMessage", (shatMsg) => {
    io.emit("shatMessage", shatMsg);
  });
});

/// connection with server ///////
const port = 3000;
server.listen(port, () => {
  console.log(`Sever is running on port ${port}`);
});
