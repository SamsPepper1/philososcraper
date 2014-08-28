exports.parseInfluence = function (item) {
	links = item.next().find('li a');
	if (links) {
		return links.map(function(){
			return this.attribs.title;
		}).toArray();
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
	$($('h2:contains(Alphabetical)').next().find('li')).each(function(index, item) {
		console.log($(item).text());
		return;
	});
};

