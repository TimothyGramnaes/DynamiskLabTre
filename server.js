const express = require("express");
const http = require("http");
const socketio = require("socket.io");

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
  
  console.log('connected - ', socket.id)

  socket.on("joinRoom", ({ username, room }) => {
    const user = joiningUser(socket.id, username, room);
    console.log('join-room says hey')

    socket.join(user.room)

    const socketRoomsSetValues = socket.rooms.values()

    const roomNameValueFromSet = (socketRoomsSetValues.next().value, socketRoomsSetValues.next().value)
    
    // console.log(socketRoomsSetValues.next().value); // loggar ut socket.id
    // console.log(socketRoomsSetValues.next().value); // loggar ut roomname

    console.log('Current room name is:', roomNameValueFromSet, 'and socket id is:', socket.id)

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
  });

  // Shows when a user leaves
  socket.on("disconnect", () => {

    console.log('disconnect - ', socket.id)

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
  });

  // Recieve messages from front-end
  socket.on("shatMessage", (shatMsg) => {
    const user = addCurrentUser(socket.id);
    io.to(user.room).emit("message", messageTemplate(user.username, shatMsg));
  });
});

/// connection with server ///////
const port = 3000;
server.listen(port, () => {
  console.log(`Sever is running on port ${port}`);
});
