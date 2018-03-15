let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let publicIP = "????";

const publicIp = require('public-ip');

// Routes
app.get('/', function(req, res) {
	res.send({
		"message":"Welcome to Acml Server",
		"local_port": port,
		"headers": req.headers,
		"rawheaders": req.rawheaders,
		"public_ip": publicIP
	});
});

// Listen

app.listen(port);
console.log('Listening on localhost:'+ port);

publicIp.v4().then(ip => {
	console.log(ip);
	publicIP = ip;
//=> '46.5.21.123'
});