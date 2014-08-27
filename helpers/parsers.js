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
	return dateRE.exec(string)[0];
}



