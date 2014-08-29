var cheerio = require('cheerio');


exports.parseInfluence = function (item) {
	links = item.next().find('li a');
	if (links) {
		names =  links.map(function(){
			return this.attribs.title;
		}).toArray();
		return names;
	}
	return [];
}

exports.parseDate = function(dateString){
	var dateRE =  /\d{3,4}/;
	var BCRE = /BC/;
	var parsedString = dateRE.exec(dateString);
	if (parsedString && parsedString.length > 0) {
		p = parseInt(parsedString[0]);
		if (BCRE.exec(dateString)){
			p *= -1;
		}
		return p? p:null;
	}
	return null;
}


exports.parsePhilosopherLinks = function (body) {
	var $ = cheerio.load(body);
	var names = [];
	return $($('h2:contains(Alphabetical)').next().find('li')).map(function(){
		return $(this).text();
	});
}
