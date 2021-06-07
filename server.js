const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { pingTimeout: 25000 });
const users = [];
const rooms = []
// const roomNamesFromSockets = [];

// message template: User, message and time-stamp
const messageTemplate = require("./forms/message.template");

//////////////////////////// set static folder /////////////////////////
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("connected - ", socket.id);
  console.log("I connection:", allRooms());
  socket.emit("activeRooms", allRooms());

  /////////////////////////////// Join room börjar ///////////////////////////////////////////////
  socket.on("joinRoom", ({ username, room, password }) => {
    console.log('nu är vi i jooining room')
    room = room || "Lobby";
    console.log(password)
    const success = joiningUser(socket.id, username, room, password);
    if (!success) {


      socket.emit('successLogin', false);

      return
    }
    socket.join(room);
    // console.log(rooms)

    // if sats för dubletter
    // const checkForDuplicateRoomNames = roomNamesFromSockets.includes(room);

    // if (checkForDuplicateRoomNames) {
    //   console.log("found duplicate");
    // } else {
    //   console.log("didnt find duplicate");
    //   roomNamesFromSockets.push(room);
    // }

    // console.log("rooms", roomNamesFromSockets);

    ///////////// welcomes the user logging in ///////////
    socket.emit(
      "message",
      messageTemplate("ShatApp", "hej o välkommen till shatapp!")
    );

    ///////////// displays message for all other users besides the user joining //////////////
    socket.broadcast
      .to(room)
      .emit(
        "message",
        messageTemplate("ShatApp", `${username} shat up the app`)
      );

    //////////// Visar alla användare i rummet //////////////////
    io.to(room).emit("usersInRoom", {
      room: room,
      users: usersInRoom(room),
    });


    socket.emit('successLogin', true);

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

      // //////////// TAR BORT RUMMET NÄR SISTA ANVÄNDAREN I RUMMET LÄMNAR /////////
      // if (usersInRoom(user.room).length === 0) {
      //   // loopa genom roomNamesFromSocket för att ta bort user.room (funkar inte alla fönster stängs)
      //   console.log("Nu var det tomt!");
      //   const index = roomNamesFromSockets.indexOf(user.room);
      //   roomNamesFromSockets.splice(index, 1);
      //   // io.sockets.in(user.room).leave(user.room);
      //   //  updateRooms();
      // }
    }
  });

  // function updateRooms() {
  // uppdatera listan rum.
  // roomNamesFromSockets uppdateras, rum utan användare visas inte.
  // roomNamesFromSockets.splice();
  //
  /////////////////////////////////////////////  HÄR SLUTAR DISCONNECT ////////////////////////////////

  /////////// Recieve messages from front-end /////////
  socket.on("shatMessage", (shatMsg) => {
    const user = addCurrentUser(socket.id);
    io.to(user.room).emit("message", messageTemplate(user.username, shatMsg));
  });

  socket.on('typing', (data) => {
    const user = addCurrentUser(socket.id);
    socket.broadcast.to(user.room).emit('typing', data)
  })

  /////////// FUNKTIONER FRÅN USER.JS //////////////////////
  //////////// Skapar en user och pushar till users ///////
  function joiningUser(id, username, room, password) {
    const existingRoom = rooms.find(r => r.roomName === room);
    console.log(rooms)
    console.log(room)
    console.log(password)
    console.log(existingRoom)
    if (existingRoom) {
      if (password != existingRoom.password) {
        console.log("fel lösem")
        return false
      }
      existingRoom.users = [...existingRoom.users, username]
      console.log("vi loggae in på ett rum ")

      const user = { id, username, room };

      users.push(user);
      return true
    }

    console.log("här skapar vi ett rum")
    const newRoom = { roomId: id, users: [username], roomName: room, password: password };
    const user = { id, username, room };
    rooms.push(newRoom)
    users.push(user);
    return true;
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
