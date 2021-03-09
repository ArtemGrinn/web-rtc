const WebSocket = require('ws');
const fs = require("fs");
const wss = new WebSocket.Server({ port: 3000 });
wss.on('connection', (ws, req) => {
	console.log('connect');
  	const fileStream = fs.createWriteStream('./output', { flags: 'a' });
 	 ws.on('message', message => {
	  	console.log('recieving');
	    // Only raw blob data can be sent
	    fileStream.write(Buffer.from(new Uint8Array(message)));
  	});
});