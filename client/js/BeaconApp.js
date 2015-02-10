var React = require('react');

var BeaconList = React.createClass({
    render: function () {

        var renderBeacon = function (beacon) {
            return <li>[{beacon.proximity}]{beacon.uuid}[{beacon.major}/{beacon.minor}]</li>;
        };

        return (<ul>{this.props.beacons.map(renderBeacon)} </ul>)
    }
});

var BeaconApp = React.createClass({

    getInitialState: function () {
        var socket;

        socket = io.connect("http://localhost:8080");

        socket.on("connect", function () {
            console.log("connect");
        });

        socket.on("beacon", this.discovery);

        return {beacons: []};

    },

    discovery: function (beacon) {
        console.log(beacon);
        this.state.beacons.push(beacon);
        this.forceUpdate();
    },

    componentDidMount: function () {
    },

    render: function () {
        return (<ul><BeaconList beacons={this.state.beacons}/></ul>);
    }

});

module.exports = BeaconApp;
