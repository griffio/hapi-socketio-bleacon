var Hapi = require("hapi");
var Bleacon = require("bleacon");
var Socketio = require("socket.io");
var server= new Hapi.Server();
server.connection({port:8080});
var io = Socketio.listen(server.listener);

var beaconService = function emitBeacon(socket) {
    Bleacon.startScanning();
    Bleacon.on('discover', function(bleacon) {
        console.log(JSON.stringify(bleacon));
        socket.emit('beacon', bleacon);    
    });        
};

io.sockets.on("connection", beaconService);

server.route({
    path: "/{static*}",
    method: "get",
    handler: {
        directory: {
            path: "./static"
        }
    }
});

server.start(function () {
    console.log(server.info.uri)
});
