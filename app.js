var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// Routes
app.get('/', function(req, res) {
	res.send({
		"message":"Welcome to Acml Server",
		"local_port": port,
		"public_host": req.rawHeaders[1]
	});
});

// Listen

app.listen(port);
console.log('Listening on localhost:'+ port);