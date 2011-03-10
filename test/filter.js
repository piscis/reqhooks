var testCase = require('nodeunit').testCase;

module.exports = testCase({

	setUp: function (callback) {
		
		this.normalizer = require(__dirname+'/../index');
		
		this.req = {};
		this.res = {};
		this.next = function(){};
		
		callback();
	},

	tearDown: function (callback) {
		// clean up
		callback();
	},

	testLastSlashIsRemoved: function(test) {
	
		test.expect(1);
		
		var filter = this.normalizer({filterChain:['stripLastSlash']});
		var fixture = {'input':'/abcd/','output':'/abcd'};
		var req = {};
		req.originalUrl = fixture['input'];

		var res = {};
		res.redirect = function(location,code) {
			test.ok(location==fixture['output'],'Failure expected: '+fixture['output']+' but got '+location);
			test.done();
		}
		
		var next = function(data){
			test.ok(false,'Test failed should never reach next');
			test.done();
		};
		
		// Start filter;
		filter(req,res,next);
	},
	
	
	testForRedirectLoop: function(test) {
	
		test.expect(1);
		
		var filter = this.normalizer({});
		var fixture = {'input':'/abcd?123=abc','output':'/abcd?123=abc'};
		var req = {};
		req.originalUrl = fixture['input'];

		var res = {};
		res.redirect = function(location,code) {
			test.ok(false,'Test failed should never reach redirect got location: '+location+' input was '+req.originalUrl);
			test.done();
		}
		
		var next = function(data){
			test.ok(true,'Test should trigger next');
			test.done();
		};
		
		// Start filter;
		filter(req,res,next);
	},
	
	
	testLastSlashIsRemovedWithGetParams: function(test) {
	
		test.expect(1);
		
		var filter = this.normalizer({filterChain:['stripLastSlash']});
		var fixture = {'input':'/abcd/?abcd=123','output':'/abcd?abcd=123'};
		var req = {};
		req.originalUrl = fixture['input'];

		var res = {};
		res.redirect = function(location,code) {
			test.ok(location==fixture['output'],'Failure expected: '+fixture['output']+' but got '+location);
			test.done();
		}
		
		var next = function(data){
			test.ok(false,'Test failed should never reach next');
			test.done();
		};
		
		// Start filter;
		filter(req,res,next);
	},
	
	
	testLastSlashStillExists: function(test) {
	
		test.expect(1);
		
		var filter = this.normalizer({filterChain:['stripLastSlash']});
		var fixture = {'input':'/','output':'/'};
		var req = {};
		req.originalUrl = fixture['input'];

		var res = {};
		res.redirect = function(location,code) {
			test.ok(false,'Test failed should never reach redirect got: '+location);
			test.done();
		}
		
		var next = function(data) {
			test.ok(true,'Expecting to reach next');
			test.done();
		};
		
		// Start Filterchain;
		filter(req,res,next);
	},
	
	testWhiteSpaceClearAll: function(test) {
	
		test.expect(1);
		
		var filter = this.normalizer({filterChain:['whitespace']});
		var fixture = {'input':'/a   b/','output':'/a-b/'};
		var req = {};
		req.originalUrl = fixture['input'];

		var res = {};
		res.redirect = function(location,code) {
			test.ok(location==fixture['output'],'Failure expected: '+fixture['output']+' but got '+location);
			test.done();
		}
		
		var next = function(data){
			test.ok(false,'Test failed should never reach next');
			test.done();
		};
		
		// Start Filterchain;
		filter(req,res,next);
	},
	
	testToUpperCase: function(test) {
	
		test.expect(1);
		
		var filter = this.normalizer({filterChain:['toUpperCase']});
		var fixture = {'input':'/abcde123/abcde123/','output':'/ABCDE123/ABCDE123/'};
		var req = {};
		req.originalUrl = fixture['input'];

		var res = {};
		res.redirect = function(location,code) {
			test.ok(location==fixture['output'],'Failure expected: '+fixture['output']+' but got '+location);
			test.done();
		}
		
		var next = function(data){
			test.ok(false,'Test failed should never reach next');
			test.done();
		};
		
		// Start Filterchain;
		filter(req,res,next);
	},
	
	testToLowerCase: function(test) {
	
		test.expect(1);
		
		var filter = this.normalizer({filterChain:['toLowerCase']});
		var fixture = {'input':'/ABCDE123/ABCDE123/','output':'/abcde123/abcde123/'};
		var req = {};
		req.originalUrl = fixture['input'];

		var res = {};
		res.redirect = function(location,code) {
			test.ok(location==fixture['output'],'Failure expected: '+fixture['output']+' but got '+location);
			test.done();
		}
		
		var next = function(data){
			test.ok(false,'Test failed should never reach next');
			test.done();
		};
		
		// Start Filterchain;
		filter(req,res,next);
	},
	
	testNonAlphaNumericsRemoved : function(test) {
		
		test.expect(1);
		
		var filter = this.normalizer({filterChain:['noneAlnum']});
		var fixture = {'input':'/1234&/%$$$adsf/asdf.gif','output':'/1234/adsf/asdf.gif'};
		var req = {};
		req.originalUrl = fixture['input'];

		var res = {};
		res.redirect = function(location,code) {
			test.ok(location==fixture['output'],'Failure expected: '+fixture['output']+' but got '+location);
			test.done();
		}
		
		var next = function(data){
			test.ok(false,'Test failed should never reach next');
			test.done();
		};
		
		// Start Filterchain;
		filter(req,res,next);
	},
	
	testStatusCodeIsRecognized: function(test) {
		
		test.expect(2);
		
		var filter = this.normalizer({filterChain:['noneAlnum'],statusCode:666});
		var fixture = {'input':'/1234&/%$$$adsf/asdf.gif','output':'/1234/adsf/asdf.gif'};
		var req = {};
		req.originalUrl = fixture['input'];

		var res = {};
		res.redirect = function(location,code) {
			
			test.ok(code==666,'Status code is wrong expected: '+666+' got '+code);
			test.ok(location==fixture['output'],'Failure expected: '+fixture['output']+' but got '+location);
			test.done();
		}
		
		var next = function(data){
			test.ok(false,'Test failed should never reach next');
			test.done();
		};
		
		// Start Filterchain;
		filter(req,res,next);
	},
	
	testCustomFilterSupport: function(test){
	
		test.expect(1);
		
		var customFilter = {
			filterName:function(str) {
				return '/BBB';
			}
		}
		
		var filter = this.normalizer({chain:['stripLastSlash','filterName'],filterList:customFilter});
		var fixture = {'input':'/AAA','output':'/BBB'};
		var req = {};
		req.originalUrl = fixture['input'];

		var res = {};
		res.redirect = function(location,code) {
			test.ok(location==fixture['output'],'Failure expected: '+fixture['output']+' but got '+location);
			test.done();
		}
		
		var next = function(data) {
			test.ok(true,'Expecting to reach next');
			test.done();
		};
		
		// Start Filterchain;
		filter(req,res,next);
	},

	// todo: make this work
	/*
	testUrlSchemas: function (test) {
		
		test.expect(1);		
		
		var n = this.normalizer;
		
		var fixtureList = [
			{'input':'/AbCd   1234&/%$$$adsf/asdf.gif','output':'/abcd-1234/adsf/asdf.gif'}
		];
		
		for(var i in fixtureList) {
			
			var fixture = fixtureList[i];
			var input = fixture['input'];
			var output = fixture['output'];
			
			this.req.originalUrl = input;
			
			var result = n.normalize({});
			test.ok(result==output,'Failure expected: '+output+' but got '+result);
		}

		test.done();
	}
	*/
});