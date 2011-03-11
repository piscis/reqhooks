var express = require('express'),
	sys = require('sys')
	reqhook = require(__dirname+'/../index.js');

var app = express.createServer(

	express.static(__dirname + '/public'),
	express.favicon(),
	express.logger({ format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time' }),
	reqhook.filter({filterChain:'stripLastSlash'}),
	express.errorHandler({ dumpExceptions: true, showStack: true })
);

app.use('/', express.errorHandler({ dump: true, stack: true }));

app.get('/', function(req, res){
    res.render('index.ejs',{config:config});
});

app.listen(3000);
