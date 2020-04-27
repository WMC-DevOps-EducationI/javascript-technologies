var assert = require('chai').assert;
var io = require('/socket.io/socket.io.js');
describe("TEST01 - Connect to socket.io server side", function() {
    describe("Check the connection to server using socket to 8082", function() {
        it("Check the data returned by the server", function() {
            var socket = io.connect('http://localhost:8082', { 'forceNew': true });
            // 'messages' is the topic of the event emmited by the server
            socket.on('messages', function(data) {
                assert.isArray(data);
                assert.isObject(data[0]);
                assert.equal(data[0].id, "server");
            });
        });
    });
});