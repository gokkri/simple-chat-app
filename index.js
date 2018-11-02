var express = require('express');
var socket = require('socket.io');



//app
var app = express();
var server = app.listen(4002, function(){
    console.log('listening on port 4002')
});


//static pages
app.use(express.static('public'));



// socket setup
var io = socket(server);


io.on('connection', function(socket){
console.log('connected ra abbai', socket.id);


//listening to front-end and emitting it to all sockets
socket.on('chat', function(data){
    io.sockets.emit("chat", data);
});



//listening to typing message and broadcasting to all clients except self 
socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
})

});
