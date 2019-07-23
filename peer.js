var app = require('express')();
var server = require('http').Server(app);
var inconn = require('socket.io')(server);
var outconn = require('socket.io-client');
const fs = require('fs')

var args = process.argv.slice(2);

function log(toLog){
    console.log(toLog)
    var d = new Date().toLocaleString();
    fs.appendFileSync('log', '[' + d + '] ' + toLog + '\n');
  }

async function init () {
    let port = args[0].replace('--port=','')

    server.listen(port);
    log('Listening on ' + port)

    inconn.on('connection', function (socket) {
        log('Peer connected.')
        setInterval(function(){
            log('Sending message to peer.')
            socket.emit('message', 'ping');
        },3000)
        socket.on('response', function (data) {
            log('Received response: ' + data);
        });
    });

    if(args[1] !== undefined){
        var socket = outconn.connect(args[1].replace('--peer=',''), {reconnect: true});
        socket.on('connect', function () {
            log('Connected to peer.')
        });
        socket.on('message', function (data) {
        socket.emit('response', 'pong')
            log('Received message: ' + data)
            log('Sending response: pong')
        });
    }
}

init()