var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// Routes
app.get('/', function(req, res) {
	res.send({
		"message":"Welcome to Acml Server",
		"local_port": port,
		"headers": req.headers,
		"rawheaders": req.rawheaders
	});
});

// Listen

app.listen(port);
console.log('Listening on localhost:'+ port);