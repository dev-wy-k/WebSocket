const express = require("express");
const socket = require('socket.io');

/**____ app setup ____ */
let app = express();

/**____ server setup ____ */
let server = app.listen(3000, () => {
    console.log('project is running on localhost:3000');
});

/**____ route setup ____ */
app.get('/', (res, req) => {
    req.sendFile(__dirname + '/public/index.html');
})

/**____ socket setup ____ */
let io = socket(server);
io.on('connection', (socket) => {
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
})