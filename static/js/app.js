var socket;

socket = io.connect("http://localhost:8080");

socket.on("connect", function () {
    console.log("connect");
});

var ractive = new Ractive({
	el: "container",
	template: "#template",
	data: { beacons: [] }
});

socket.on("beacon", function(beacon) {
    var beacons = ractive.get("beacons");
    beacons.push(beacon);
    console.log(beacon);
});

