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
	console.log(body); 
	return;
});
