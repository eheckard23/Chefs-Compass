const express = require('express'),
	path = require('path'),
	app = express();

// static html, css, js files
app.use(express.static('public'));
// send index on root path
app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.set('port', process.env.PORT || 3000)

// server listener
exports.listener = app.listen(app.get('port'), () => {
	console.log(`Server running on port ${app.get('port')}`);
});

exports.app = app;