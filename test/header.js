var testCase = require('nodeunit').testCase;

module.exports = testCase({

	setUp: function (callback) {
		
		// Exposing header
		this.header = require(__dirname+'/../index').header;
		
		this.req = {};
		this.res = {};
		this.next = function(){};
		
		callback();
	},

	tearDown: function (callback) {
		// clean up
		callback();
	},

	testHeaderIsSet: function(test){
	
		test.expect(2);
		var header = this.header({key:'Location',value:'http://www.example.com/'});
		
		var req = {};
		var res = {};
		
		res['_headers'] = [];

		res.setHeader = function(key,value) {
		
			var h = {};
			h[key]=value;
			res._headers.push(h);
		};
		
		var next = function(data) {
			test.ok(true,'Expecting to reach next');
			test.ok(res._headers.length == 1, "There should be a header registered");
			test.done();
		};

		header(req,res,next);
	},

	testHeaderListIsSet: function(test){
	
		test.expect(2);
		
		var headerList = [
			{key:'Location',value:'http://www.example.com/'}
			,{key:'Location2',value:'http://www.example.com/2'}
		]

		var header = this.header(headerList);
		
		var req = {};
		var res = {};
		
		res['_headers'] = [];

		res.setHeader = function(key,value) {
		
			var h = {};
			h[key]=value;
			res._headers.push(h);
		};
		
		var next = function(data) {
			test.ok(true,'Expecting to reach next');
			test.ok(res._headers.length == 2, "There should be a header registered");
			test.done();
		};

		header(req,res,next);
	}
});
