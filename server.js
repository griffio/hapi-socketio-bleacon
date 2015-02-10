var Hapi = require("hapi");
var Bleacon = require("bleacon");
var Socketio = require("socket.io");
var Bacon = require("baconjs").Bacon;

var server= new Hapi.Server();
server.connection({port:8080});
var io = Socketio.listen(server.listener);
io.sockets.on("connection", function(socket) {

    var discoveries = Bacon.fromBinder(function(sink) {
        Bleacon.on('discover', function(bleacon){
            sink(bleacon);
        });
    });

    discoveries.skipDuplicates(function(oldval, newval) {
        return oldval.uuid === newval.uuid
            && oldval.major === newval.major
            && oldval.minor === newval.minor
            && oldval.proximity === newval.proximity;
    }).onValue(function(bleacon) {
        socket.emit("beacon", bleacon);
    });

    Bleacon.startScanning();

});

server.route({
    path: "/{client*}",
    method: "get",
    handler: {
        directory: {
            path: "./client"
        }
    }
});

server.start(function () {
    console.log(server.info.uri)
});
