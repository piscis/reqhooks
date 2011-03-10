exports = module.exports = {
	
	// Filter: Remove all Filterspaces
	'whitespace': function(str) {

		if(str.match(/\s/g)) {
			// Replace the first matching
			str = str.replace(/\s/,'-');

			// And strip off the rest
			while(str.match(/\s/g)) {
				str = str.replace(/\s/,'');
			}
		}
		
		return str;
	},
	
	// Filter: toLowerCase letters
	'toLowerCase':function(str){

		if(str.match(/[A-Z]/g)){
			str = str.toLowerCase();
		}
		return str;	
	},
	
	// Filter: upper case letters
	'toUpperCase':function(str){

		if(str.match(/[a-z]/g)){
			str = str.toUpperCase();
		}
		return str;	
	},
	
	// Filter: filter non alphernumeric characters
	'noneAlnum': function(str){

		if(str.match(/[^A-Za-z0-9\-\/\.]/g)){
			str = str.replace(/[^A-Za-z0-9\-\/\.]/g,'');
		}
		return str;	
	},
	
	// Filter: slashes
	'stripLastSlash':function(str){

		if(str != '/' && str.match(/\/$/)){
			str = str.replace(/\/$/,'');
		}	
		return str;
	}
};



