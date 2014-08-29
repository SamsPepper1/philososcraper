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

exports.parseDate = function(string){
	var dateRE =  /\d{1,2} \w+ \d{4}/;
	p = dateRE.exec(string);
	return p? p[0]:null;
}


exports.parsePhilosopherLinks = function (body) {
	var $ = cheerio.load(body);
	var names = [];
	return $($('h2:contains(Alphabetical)').next().find('li')).map(function(){
		return $(this).text();
	});
//.each(function(index, item) {

//		names.push($(item).text());
//		return;
//	});
//	return names;
};

