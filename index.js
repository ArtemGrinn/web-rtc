const WebSocket = require('ws');
const fs = require("fs");
const port = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: port });
console.log("Listening port: " + port);
wss.on('connection', (ws, req) => {
	console.log('connect');
  	const fileStream = fs.createWriteStream('./output', { flags: 'a' });
 	 ws.on('message', message => {
	  	console.log('recieving');
	    // Only raw blob data can be sent
	    fileStream.write(Buffer.from(new Uint8Array(message)));
  	});
});