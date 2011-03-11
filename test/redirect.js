var testCase = require('nodeunit').testCase;

module.exports = testCase({

	setUp: function (callback) {
		
		// Exposing filter
		this.plugin = require(__dirname+'/../index').redirect;
		
		this.req = {};
		this.res = {};
		this.next = function(){};
		
		callback();
	},

	tearDown: function (callback) {
		// clean up
		callback();
	},

	testSingleRedirect: function(test) {
	
		test.expect(2);
		
		var list = {from: '/blabla', to:'/blub', code:302};
		
		
		var redirect = this.plugin({'list':list});
		var req = {};
		
		req.originalUrl = '/blabla';

		var res = {};
		
		res.redirect = function(location,code) {
			
			var toFix = list['to'];
			var codeFix = list['code'];
			
			test.ok(location==toFix,'Failure expected: '+toFix+' but got '+location);
			test.ok(code==codeFix,'Failure expected response code: '+codeFix+' but got '+code);
			test.done();
		}
		
		var next = function(data){
			test.ok(false,'Test failed should never reach next');
			test.done();
		};
		
		// Start filter;
		redirect(req,res,next);
	},
	
	testMultipleRedirectList: function(test) {
	
		test.expect(2);
		
		var list = [
			{from: '/foobar_1', to:'/new_foobar_1',  code: 301},
			{from: '/foobar_1', to:'/new_foobar_1',  code: 301},
			{from: '/redirect_me', to:'/new_target', code: 302},
			{from: '/foobar_1', to:'/new_foobar_1',  code: 301},
		];
		
		
		var redirect = this.plugin({'list':list});
		var req = {};
		
		req.originalUrl = '/redirect_me';

		var res = {};
		
		res.redirect = function(location,code) {
			
			var toFix = list[2]['to'];
			var codeFix = list[2]['code'];
			
			test.ok(location==toFix,'Failure expected: '+toFix+' but got '+location);
			test.ok(code==codeFix,'Failure expected response code: '+codeFix+' but got '+code);
			test.done();
		}
		
		var next = function(data){
			test.ok(false,'Test failed should never reach next');
			test.done();
		};
		
		// Start filter;
		redirect(req,res,next);
	},
	
	testIsNoRedirectTarget: function(test) {
	
		test.expect(1);
		
		var list = [
			{from: '/foobar_1', to:'/new_foobar_1',  code: 301},
			{from: '/foobar_1', to:'/new_foobar_1',  code: 301},
			{from: '/redirect_me', to:'/new_target', code: 302},
			{from: '/foobar_1', to:'/new_foobar_1',  code: 301},
		];
		
		var redirect = this.plugin({'list':list});
		var req = {};
		
		req.originalUrl = '/lala';

		var res = {};
		
		res.redirect = function(location,code) {
			
			test.ok(false,'Test failed should never reach next');
			test.done();
			
		}
		
		var next = function(data){
				test.ok(true,'Expect to reach this point');
				test.done();
		};
		
		// Start filter;
		redirect(req,res,next);
	}
});