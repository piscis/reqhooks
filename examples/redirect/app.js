var express = require('express'),
    reqhook = require(__dirname+'/../../index.js');

var rlist = [
	{from: '/foobar_1', to:'/',  code: 301},
	{from: '/foobar_2', to:'/',  code: 301},
	{from: '/redirect_me', to:'/', code: 302},
	{from: '/foobar', to:'/',  code: 301},
];

var app = express.createServer(
	reqhook.redirect({list:rlist})
);

app.use('/', express.errorHandler({ dump: true, stack: true }));

app.get('/', function(req, res){
    res.send('CaWaBuNgA');
});

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);