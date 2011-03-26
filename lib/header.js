exports = module.exports = function header(options) {

	options = options || {};

	return function header(req, res, next) {
		appendHeader(req, res, next, options);
	};
};

var appendHeader = exports.appendHeader = function(req,res,next,options) {

	options = options || {};
	headerList = [];

	if(options instanceof Array) {
		headerList = options;
	} else {
		headerList.push(options);
	}	

	for(var i in headerList) {

		var headerObj = headerList[i];

		if(headerObj.key && headerObj.value) {
			res.setHeader(headerObj.key,headerObj.value);
		}
	}
	
	next();
}
