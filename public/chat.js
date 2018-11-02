// connecting front -end

var socket = io.connect('http://localhost:4002');


//query DOM
var  message = document.getElementById('message'); 
var  handle = document.getElementById('handle');
var  button = document.getElementById('send');  
var  output = document.getElementById('output'); 
var  feedback = document.getElementById('feedback'); 


//emit message on click event 
button.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
});


//emit message on typing  event
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});


 
//listen for chat events  and display in front end
socket.on("chat", function(data){
    feedback.innerHTML = " ";
    output.innerHTML += "<p><strong>" + data.handle + "</strong>" + " " + data.message + "</p>"
});


//listening to typing message event and displaying in front end
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + " is typing a message ..<em/><p/>";
});


