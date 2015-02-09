Initial Beacon app with socket.io

### Requirements on Linux

python 2

~~~
sudo find -path '*bleno*Release/hci-ble' -exec sudo setcap cap_net_raw+eip '{}' \;
~~~

~~~
var Hapi = require("hapi");
var Bleacon = require("bleacon");
var Socketio = require("socket.io");
~~~

~~~
npm install
npm start
~~~

http://localhost:8080/
