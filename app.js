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

let shortenSTUN = true; // set to true if your STUN server disconnects too early
let localIP = '0.0.0.0'; // You can try 0.0.0.0

let net = require('net');
let stun = require('./lib/vs-stun');
let events = require('events');

let PublicTCP = function (cb) {
	if (cb) this.on('refresh', cb);
};

PublicTCP.prototype = new events.EventEmitter;

PublicTCP.prototype.start = function (stunserver) { // example: stun.stunprotocol.org
	if (typeof stunserver === 'string') stunserver = {host: stunserver};
	stunserver.port = stunserver.port || 3478;

	let self = this;
	let sock = this.socket = net.connect({port: stunserver.port, host: stunserver.host,  localAddress: localIP},
		function () {
			stun.resolve_tcp(sock, stunserver, function (err, value) {
				if (err) {
					console.log('Something went wrong: ' + err);
				} else {
					console.log("STUN Response:");
					console.log(value);
					self.emit('refresh', value);
				}
			}, {short: shortenSTUN});
		});

	// sock.on('error', (err)=>{
	// 	console.log(err);
	// });

	sock.connect();

	sock.setTimeout(10000);

	sock.on('timeout', () => {
		console.log('socket timeout');
		sock.end();
	});
};

PublicTCP.prototype.close = function () {
	this.emit('close');
	this.socket.end();
};

let tcp = new PublicTCP();
tcp.on('refresh', function (data) {

	sock = net.createServer(function (c) {
	});
	sock.listen(data.local.port, data.local.host);

	console.log("Local listening socket:");
	console.log(sock.address());

	setTimeout(function () {
		console.log("timeout");
		tcp.close();
	}, 5000);

	tcp.on('close', function () {
		sock.close();
	});

});

// let stunserver = {host: 'stun.l.google.com', port: 19302};
let stunserver = {host: 'stun.l.google.com', port: 19302};
// tcp.start(stunserver);



let socket, server = { host: 'stun.l.google.com', port: 19302 };

let callback = function callback ( error, value ) {
	if ( !error ) {
		socket = value;


		setInterval(()=>{
			console.log(socket.stun);
		}, 2000);

		stun.resolve_tcp(socket, stunserver, function (err, value) {
			if (err) {
				console.log('Something went wrong: ' + err);
			} else {
				console.log("STUN Response:");
				console.log(value);
				self.emit('refresh', value);
			}
		}, {short: shortenSTUN});

		socket.close();
	}
	else console.log('Something went wrong: ' + error);
};

stun.connect(server, callback);
