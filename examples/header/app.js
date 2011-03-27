var express = require('express'),
reqhook = require(__dirname+'/../../index.js');

/**
 * Header hook example
 */
var reqhook = require(__dirname+'/../../index.js');

var app = express.createServer(
	reqhook.header({key:'P3P',value:'CP="ALL DSP COR PSAa PSDa OUR NOR ONL UNI COM NAV"'})
);

app.use('/', express.errorHandler({ dump: true, stack: true }));

app.get('/', function(req, res){
    res.send('CaWaBuNgA');
});

app.listen(3000);
console.log("Header example - server listening on port %d", app.address().port);
console.log("Call / and you see a P3P header in your response\n");