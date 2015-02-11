var React = require('react');

var BeaconListItem = React.createClass({
   render: function () {
    var beacon = this.props.beacon; 
        return
        (<li>[{beacon.proximity}]{beacon.uuid}[{beacon.major}/{beacon.minor}]</li>);
   
   }
});

var BeaconList = React.createClass({
    render: function () {
        
         return (
               <ul>
                   {this.props.beacons.map(function(beacon, idx) {
                      return <BeaconListItem key={idx} beacon={beacon}/>;
                   })};
               </ul>
               );
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
        return (<BeaconList beacons={this.state.beacons}/>);
    }

});

module.exports = BeaconApp;
