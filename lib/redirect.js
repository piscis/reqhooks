exports = module.exports = function redirect(options){

	options = options || {};

	return function redirect(req, res, next) {
		compile(req, res, next, options);
	};
};

var compile = exports.compile = function(req,res,next,options) {

	options = options || {};
	
	var originalUrl = req.originalUrl;
	
	var target = _isInList(originalUrl,options);
	
	if(target!=false) {
		
		var statusCode = target['code'] ? target['code'] : 301;
		res.redirect(target['to'],target['code']);
		
	} else {
		next();
	}
}

var _isInList = function(url,options) {	
	
	var list =[];
	
	if(options['list'] && typeof options['list']=='object' && options['list']['from'] && options['list']['to']) {
		list.push(options['list']);
		
	} else if(options['list'] && options['list'] instanceof Array){
		list  = options['list'] ? options['list'] : [];
	}
	
	for(var k in list) {
		
		if(list[k].from==url) {	
			return list[k];
		}
	}
	
	return false;
}
