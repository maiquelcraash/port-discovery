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

let detecPort = setInterval(() => {
	let run = exec('node_modules/pia/bin/pia pia -a --display-stun --specify-stun "stun.l.google.com:19302"', function (error, stdout, stderr) {
		if (error) {
			console.log(error, stderr);
		}
	});
	console.log(run.toString());
}, 5000);
