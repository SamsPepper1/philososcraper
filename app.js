var request = require('request');
var cheerio = require('cheerio');

function getPage(url, callback) {
	request.get(url, callback)
}

function  parsePhilosopherLinks(err,resp,body) {
	if (err) {
		console.log('had an error');
		console.log(err);
		return;
	};
	var $ = cheerio.load(body);
	$($('h2:contains(Alphabetical)').next().find('li')).each(function(index, item) {
		console.log($(item).text());
		return;
	});
};
	

var url = 'https://en.wikipedia.org/wiki/List_of_social_and_political_philosophers'

getPage(url, parsePhilosopherLinks);

