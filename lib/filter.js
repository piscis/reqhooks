var defaultFilterList = require('./filter/defaultList');

exports = module.exports = function filter(options){

	options = options || {};

	return function filter(req, res, next) {
		normalize(req, res, next, options);
	};
};

var normalize = exports.normalize = function(req,res,next,options) {

	var statusCode = options['statusCode'] ? options['statusCode'] : 301;
	options = options || {};
	filterList = defaultFilterList;
	filterChain = [];
	
	// Extending: filterChain
	if(options['filterChain']) {
	
		if(options['filterChain'] instanceof Array) {
			
			filterChain = options['filterChain'];
			
		} else if(typeof options['filterChain'] =='string'){
			
			filterChain = [];
			filterChain.push(options['filterChain']);
		}
	}
	
	// Extending filterList
	if(options['filterList'] && typeof options['filterList'] == 'object') {
		
		for(var k in options['filterList']) {
			
			if(typeof options['filterList'][k]=='function') {
				
				var isFilterInChain = false;
				
				filterList[k] = options['filterList'][k];	
				
				for(var i in filterChain) {
					if(i==k){
						isFilterInChain = true;
						break;
					}
				}
				
				if(!isFilterInChain) {
					filterChain.push(k);
				}
			}
		}
	}
	
	if(req.originalUrl.lastIndexOf('?')>0) {
		
		var _params = req.originalUrl.substr(req.originalUrl.lastIndexOf('?'),req.originalUrl.length);
		var originalUrl = req.originalUrl.substr(0,req.originalUrl.lastIndexOf('?'));
		
	} else {
		var originalUrl = req.originalUrl;
		var _params ='';
	}
	
	var url = require('url');
	
	originalUrl = unescape(originalUrl);
	
	var filteredUrl = _sanitize(originalUrl)+''+_params;
	
	if(unescape(req.originalUrl) != filteredUrl) {
		res.redirect(filteredUrl,statusCode);
	} else {
		next();
	}
}

var _sanitize = function(url) {
	
	for(var i in filterChain) {
		if(filterList.hasOwnProperty(filterChain[i]) 
			&& typeof filterList[filterChain[i]] == 'function') {
			
			var curFilter = filterList[filterChain[i]];
			url = curFilter(url);
		}
	}
	
	return url;
}