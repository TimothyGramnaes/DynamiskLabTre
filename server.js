const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const activeRooms = []
const app = express();
const server = http.createServer(app);
const io = socketio(server, { pingTimeout: 25000 });
const users = [];
// message template: User, message and time-stamp
const messageTemplate = require("./forms/message.template");

// Utilities for users and rooms
// const {
//   joiningUser,
//   addCurrentUser,
//   leavingUser,
//   usersInRoom,
// } = require("./forms/users");

//////////////////////////// set static folder /////////////////////////
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("connected - ", socket.id);

  socket.on("activeRooms", (data) => {
    console.log(data);
    activeRooms.push(data)
    socket.emit('displayRooms', activeRooms)
  });

  /////////////////////////////// Join room börjar ///////////////////////////////////////////////
  socket.on("joinRoom", ({ username, room }) => {
    const user = joiningUser(socket.id, username, room);
    console.log("join-room says hey");
    socket.join(user.room);
    const socketRoomsSetValues = socket.rooms.values();
    const roomNameValueFromSet =
      (socketRoomsSetValues.next().value, socketRoomsSetValues.next().value);
    // console.log(socketRoomsSetValues.next().value); // loggar ut socket.id
    // console.log(socketRoomsSetValues.next().value); // loggar ut roomname
    console.log(
      "Current room name is:",
      roomNameValueFromSet,
      "and socket id is:",
      socket.id
    );



    ///////////// welcomes the user logging in ///////////
    socket.emit(
      "message",
      messageTemplate("ShatApp", "hej o välkommen till shatapp!")
    );

    ///////////// displays message for all other users besides the user joining //////////////
    // socket.broadcast
    //   .to(user.room)
    //   .emit(
    //     "message",
    //     messageTemplate("ShatApp", `${user.username} shat up the app`)
    //   );

    //////////// Visar alla användare i rummet //////////////////
    io.to(user.room).emit("usersInRoom", {
      room: user.room,
      users: usersInRoom(user.room),
    });

  });
  //////////////////////////////////////////////// HÄR SLUTAR JOIN ROOM /////////////////////////////////////////////////////////////////

  ///////////// Shows when a user leaves///////////
  socket.on("disconnect", () => {
    console.log("disconnect - ", socket.id);

    const user = leavingUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        messageTemplate("ShatApp", `${user.username} had enough`)
      );

      ///////////// Users in rooms ////////////////
      io.to(user.room).emit("usersInRoom", {
        room: user.room,
        users: usersInRoom(user.room),
      });
    }
  });
  /////////////////////////////////////////////  HÄR SLUTAR DISCONNECT ////////////////////////////////

  /////////// Recieve messages from front-end /////////
  socket.on("shatMessage", (shatMsg) => {
    const user = addCurrentUser(socket.id);
    io.to(user.room).emit("message", messageTemplate(user.username, shatMsg));
  });

  /////////// FUNKTIONER FRÅN USER.JS //////////////////////
  //////////// Skapar en user och pushar till users ///////
  function joiningUser(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
  }
  //////////// Get current user ////////////////
  function addCurrentUser(id) {
    return users.find((user) => user.id == id);
  }
  //////////////// User lämnar chatten//////////
  function leavingUser(id) {
    const i = users.findIndex((user) => user.id === id);

    if (i !== -1) {
      return users.splice(i, 1)[0];
    }
  }

});
/////////// Visar användare i rummet ////////////
function usersInRoom(room) {
  return users.filter((user) => user.room === room);
}
///////////////////////////////////////////////// HÄR SLUTAR CONNECTION ///////////////////////////////////////////////////////

/// connection with server ///////
const port = 3000;
server.listen(port, () => {
  console.log(`Sever is running on port ${port}`);
});
