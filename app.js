var request = require('request');
var cheerio = require('cheerio');

function getPage(url, callback) {
	request.get(url, callback)
}

var url = 'https://en.wikipedia.org/wiki/List_of_social_and_political_philosophers'

getPage(url, function(err,resp,body){
	if (err) {
		console.log('had an error');
		console.log(err);
		return;
	}
	var $ = cheerio.load(body);
	var li = $('h2:contains(Alphabetical)').next().find('li')
	$(li).each(function(index, item) {
		console.log($(item).text());
	});
});
