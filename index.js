const express = require('express');
const app = express();

let tessel = null;
try {
  tessel = require('tessel');
} catch(e) {
}

app.use('/', express.static(__dirname + '/build'));
app.listen(tessel ? 80 : 8080);

if (tessel) {
  tessel.network.wifi.connection(function(error, settings) {
    console.log(`Server running at http://${settings.ip}/`);
  });
} else {
  console.log("Server running at http://127.0.0.1:8080/");
}