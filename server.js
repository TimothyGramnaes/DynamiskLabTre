const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { pingTimeout: 25000 });
const users = [];

// message template: User, message and time-stamp
const messageTemplate = require("./forms/message.template");

//////////////////////////// set static folder /////////////////////////
app.use(express.static("public"));

io.on("connection", (socket) => {

  console.log("New connection - ", socket.id);
  socket.emit("activeRooms", allRooms());

  /////////////////////////////// Join room börjar ///////////////////////////////////////////////
  socket.on("joinRoom", ({ username, room }) => {
    room = room || "Lobby";

    // if (password !== '') {
    //   console.log('room has password:', password)
    // }

    const user = joiningUser(socket.id, username, room);
    socket.join(user.room);
    console.log('user.room:', user.room)
    console.log('username:', username, ', room:', room)

    ///////////// welcomes the user logging in ///////////
    socket.emit(
      "message",
      messageTemplate("ShatApp", "hej o välkommen till shatapp!")
    );

    ///////////// displays message for all other users besides the user joining //////////////
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        messageTemplate("ShatApp", `${user.username} shat up the app`)
      );

    //////////// Visar alla användare i rummet //////////////////
    io.to(user.room).emit("usersInRoom", {
      room: user.room,
      users: usersInRoom(user.room),
    });
  });
  //////////////////////////////////////////////// HÄR SLUTAR JOIN ROOM /////////////////////////////////////////////////////////////////



  ///////////// Shows when a user leaves ///////////
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
    console.log('från shatMessage socket:', user.room)
    io.to(user.room).emit("message", messageTemplate(user.username, shatMsg));
  });

  // Show 'User is typing...' text feature
  socket.on('typing', (data) => {
    const user = addCurrentUser(socket.id);
    socket.broadcast.to(user.room).emit('typing', data)
  })



  /////////// FUNKTIONER FRÅN USER.JS //////////////////////
  //////////// Skapar en user och pushar till users ///////
  function joiningUser(id, username, room) {
    // room = room.name
    const user = { id, username, room };
    console.log('från joiningUser funktionen:', 'room är:', room, 'user är:', user)
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

function allRooms() {
  const allRoomsIncDuplicates = users.map((user) => user.room);
  return [...new Set(allRoomsIncDuplicates)]; // removes duplicates
}
///////////////////////////////////////////////// HÄR SLUTAR CONNECTION ///////////////////////////////////////////////////////

/// connection with server ///////
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
