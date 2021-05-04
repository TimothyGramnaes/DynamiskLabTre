const express = require('express');
const http = require('http');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);


//// set static folder /////
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('first socket!')

    socket.emit('message', 'hej o välkommen till shatapp!');

    socket.broadcast.emit('message', 'här är en broadcast till alla')
})


/// connection with server ///////
const port = 3000
server.listen(port, () => {
    console.log(`Sever is running on port ${port}`)
})