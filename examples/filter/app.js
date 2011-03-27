var express = require('express');	

/**
 * Single filter example
 */
var reqhook1 = require(__dirname+'/../../index.js');

var app1 = express.createServer(
	reqhook1.filter({filterChain:'stripLastSlash'})
);

app1.use('/', express.errorHandler({ dump: true, stack: true }));

app1.get('/cawabunga', function(req, res){
    res.send('CaWaBuNgA');
});

app1.listen(3000);
console.log("Single filter example - server listening on port %d", app1.address().port);
console.log("Call /cawabunga/ and it goes to /cawabunga\n");


/**
 * Multiple filter example 
 */
var multiFilterChain = ['stripLastSlash', 'toLowerCase'];

var reqhook2 = require(__dirname+'/../../index.js');
var app2 = express.createServer(
	reqhook2.filter({filterChain:multiFilterChain})
);

app2.use('/', express.errorHandler({ dump: true, stack: true }));

app2.get('/cawabunga', function(req, res){
    res.send('CaWaBuNgA');
});

app2.listen(3001);
console.log("Multi filter example - server listening on port %d", app2.address().port);
console.log("Call /CaWaBunGa/ and it goes to /cawabunga\n");

/**
 * Custom filter example
 */
 
var customFilter = {
  // Transform all route to /BBB
	filterName:function(str) { return '/BBB';	}
}

var reqhook3 = require(__dirname+'/../../index.js');

var app3 = express.createServer(
	reqhook3.filter({filterList:customFilter})
);

app3.use('/', express.errorHandler({ dump: true, stack: true }));

app3.get('/cawabunga', function(req, res){
    res.send('CaWaBuNgA');
});

app3.get('/BBB', function(req, res){
    res.send('CaWaBBBuNgA');
});

app3.listen(3002);
console.log("Custom filter example - server listening on port %d", app3.address().port);
console.log("Call /cawabunga and it goes to /BBB\n");