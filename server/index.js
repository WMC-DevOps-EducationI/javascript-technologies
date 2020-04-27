var express = require('express');
var app = express();
var server = require('http').Server(app);

// Listen sockets in the http connections with socket.io
var io = require('socket.io')(server);

// Middleware - static views
app.use(express.static('client'));

app.get('/home', (req, res) => {
    res.status(200).send('Welcome');
});

var outboundMessages = [{
    id: "server",
    text: "Welcome to the Node.js Express and Socket.io Chat interaction"
}];

// Trigger events with on:
// socket as a param receives the information of the socket
io.on('connection', (socket) => {
    // The Client IP:
    console.log('Connecting to the socket from: ' + socket.handshake.address + " is connected ... ")
    socket.emit('messages', outboundMessages);

    // Socket has to listen to new messages:
    socket.on('client-message', function(message) {
        // Persist messages received in memory:
        console.log(message);
        outboundMessages.push(message);
        socket.emit('messages', message);
    });

});

server.listen(8082, function() {
    console.log('Server is running in http://localhost:8082');
});