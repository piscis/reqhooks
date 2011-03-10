var defaultFilterList = require('./filterList');

exports = module.exports = function normalize(options){

	options = options || {};

	return function normalize(req, res, next) {
		filter(req, res, next, options);
	};
};

var filter = exports.filter = function(req,res,next,options) {

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
	
	var originalUri = req.originalUrl;
	var filteredUrl = _sanitize(originalUrl);
	
	if(originalUrl != filteredUrl) {
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