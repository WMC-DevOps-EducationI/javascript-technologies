var socket = io.connect('http://localhost:8082', { 'forceNew': true });
// 'messages' is the topic of the event emmited by the server
socket.on('messages', function(data) {
    console.log(data);
    renderMessage(data);
});

function renderMessage(data) {
    var elements = data.map(function(message, index) {
        return (`
            <div class="message">
                <strong>${message.id}</strong> dice: 
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    document.getElementById('messages').innerHTML = elements;
}

function sendMessage(e) {
    var message = {
        id: document.getElementById('ide').value,
        text: document.getElementById('inputMessage').value
    }
    socket.emit('client-message', message);
    return false;
}