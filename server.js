const express = require('express');
const http = require('http');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);


//// set static folder /////
app.use(express.static('public'));



/// connection with server ///////
const port = 3000
server.listen(port, () => {
    console.log(`Sever is running on port ${port}`)
})