let express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	exec = require('child_process').execSync;

// Routes
app.get('/', function (req, res) {
	res.send({
		"message": "Welcome to Acml Server",
		"local_port": port,
		"headers": req.headers,
		"rawheaders": req.rawheaders,
	});
});

// Listen

app.listen(port);
console.log('Listening on localhost:' + port);

let stun = require('vs-stun');

let socket, server = { host: 'stun.l.google.com', port: 19302 }

let callback = function callback ( error, value ) {
	if ( !error ) {
		socket = value;

		setInterval(()=>{
			console.log(socket.stun);
		}, 2000);

		// socket.close();
	}
	else console.log('Something went wrong: ' + error);
};

stun.connect(server, callback);
