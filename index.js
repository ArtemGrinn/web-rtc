const fs = require("fs");
var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")
wss.on('connection', (ws) => {
	console.log('connect');
  	const fileStream = fs.createWriteStream('./output.mp4', { flags: 'a' });
 	 ws.on('message', message => {
	  	console.log('recieving');
	    fileStream.write(Buffer.from(new Uint8Array(message)));
  	});
	ws.on("close", function() {
		console.log("websocket connection close")
		clearInterval(id)
	});
});
