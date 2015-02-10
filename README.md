Initial Beacon app with socket.io, ReactJs and Browserify.

### Requirements on Linux

virtualenv -p python2

~~~
sudo find -path '*bleno*Release/hci-ble' -exec sudo setcap cap_net_raw+eip '{}' \;
~~~

~~~
var Hapi = require("hapi");
var Bleacon = require("bleacon");
var Socketio = require("socket.io");
var Bacon = require("baconjs").Bacon;
~~~

~~~
npm install
npm build
npm start
~~~

http://localhost:8080/
