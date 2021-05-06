const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// message template: User, message and time-stamp
const messageTemplate = require("./forms/message.template");

// Utilities for users and rooms
const {
  joiningUser,
  addCurrentUser,
  leavingUser,
  usersInRoom,
} = require("./forms/users");

//// set static folder /////
app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = joiningUser(socket.id, username, room);

    socket.join(user.room);

    // socket.adapter.rooms

    // welcomes the user logging in
    socket.emit(
      "message",
      messageTemplate("ShatApp", "hej o välkommen till shatapp!")
    );

    // displays message for all other users besides the user joining
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        messageTemplate("ShatApp", `${user.username} shat up the app`)
      );

    // Users in rooms
    io.to(user.room).emit("usersInRoom", {
      room: user.room,
      users: usersInRoom(user.room),
    });

    io.emit("rooms-update", getRooms());
  });

  // Shows when a user leaves
  socket.on("disconnect", () => {
    const user = leavingUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        messageTemplate("ShatApp", `${user.username} had enough`)
      );

      // Users in rooms
      io.to(user.room).emit("usersInRoom", {
        room: user.room,
        users: usersInRoom(user.room),
      });
    }

    io.emit("rooms-update", getRooms());
  });

  // Recieve messages from front-end
  socket.on("shatMessage", (shatMsg) => {
    const user = addCurrentUser(socket.id);
    io.to(user.room).emit("message", messageTemplate(user.username, shatMsg));
  });
});

function getRooms() {
  const sockets = Object.values(io.sockets.sockets);
  let rooms = [];
  for (const socket of sockets) {
    const existingRooms = Object.keys(socket.room).filter(
      (room) => room !== socket.id
    );
    rooms.push(...existingRooms);
    console.log(existingRooms);
  }
  return [...new Set(rooms)];
}

/// connection with server ///////
const port = 3000;
server.listen(port, () => {
  console.log(`Sever is running on port ${port}`);
});
