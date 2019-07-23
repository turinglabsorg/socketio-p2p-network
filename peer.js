var app = require('express')();
var server = require('http').Server(app);
var inconn = require('socket.io')(server);
var outconn = require('socket.io-client');
var getPort = require('get-port')

var args = process.argv.slice(2);

async function init () {
    let port = args[0].replace('--port=','')

    server.listen(port);
    console.log('Listening on ' + port)

    inconn.on('connection', function (socket) {
        console.log('Peer connected.')
        setInterval(function(){
            console.log('Sending message to peer.')
            socket.emit('message', 'ping');
        },3000)
        socket.on('response', function (data) {
            console.log('Received response: ' + data);
        });
    });

    if(args[1] !== undefined){
        var socket = outconn.connect(args[1].replace('--peer=',''), {reconnect: true});
        socket.on('connect', function () {
            console.log('Connected to peer.')
        });
        socket.on('message', function (data) {
        socket.emit('response', 'pong')
        console.log('Received message: ' + data)
        });
    }
}

init()