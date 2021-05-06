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

function onConnection(socket) {
  console.log('connected -', socket.id)

  // when socket emits message, the server will emit message back
  socket.on('message', (data) => {
    io.to(data.room).emit('message', data)
  })

  socket.on("joinRoom", ({ username, room }) => {
    console.log('socket.on(joinRoom) säger hej')
    const user = joiningUser(socket.id, username, room);
  
    socket.join(user.room);
    
    // toggle UI/view from this event, 'io' can be swapped for 'socket'
    io.to(socket.id).emit('join successful', 'success') 

    // io.emit('joined-room', data)

    // Broadcast to everyone, the list of rooms
    io.emit('rooms-update', getRooms()) // ex: ["badrummet", "lobbyn"]

    // displays "user has joined" message
    socket.broadcast.to(user.room).emit("message", messageTemplate("ShatApp", `${user.username} shat up the app`));
    
    // welcome-message when joining room
    socket.emit("message", messageTemplate("ShatApp", "hej o välkommen till shatapp!"));
  
    // Users in rooms
    io.to(user.room).emit("usersInRoom", {room: user.room, users: usersInRoom(user.room)});
  });
  
  // Shows when a user leaves
  socket.on("disconnect", () => {
    const user = leavingUser(socket.id);
  
    if (user) {
      io.to(user.room).emit("message", messageTemplate("ShatApp", `${user.username} had enough`));
  
      // Users in rooms
      io.to(user.room).emit("usersInRoom", { room: user.room, users: usersInRoom(user.room) });
    }

    io.emit('rooms-update', getRooms())
  });
  
  // Recieve messages from front-end
  socket.on("shatMessage", (shatMsg) => {
    const user = addCurrentUser(socket.id);
    io.to(user.room).emit("message", messageTemplate(user.username, shatMsg));
  });

  socket.emit('rooms-update', getRooms())
}

function getRooms() {
  console.log('hej från getRooms()')
  const sockets = Object.values(io.sockets.sockets)
  console.log('sockets:', sockets)
  let rooms = []
  for (const socket of sockets) { // loop through all connected clients
    const activeRooms = Object.keys(socket.rooms).filter(room => room ==! socket.id) // get all client's rooms, but filter away clients own id
    rooms.push(...activeRooms)
    console.log('activeRooms:', activeRooms)
    console.log('rooms[]:', rooms)
  }
  return [...new Set(rooms)] // 'Set' removes all duplicates, returns String[]
}

io.on('connection', onConnection)

/// connection with server ///////
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
