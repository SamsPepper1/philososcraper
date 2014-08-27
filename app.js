var request = require('request');
var cheerio = require('cheerio');

function getPage(url, callback) {
	request.get(url, function(err, resp, body){
		if (err) {
			console.log('had an error');
			console.log(err);
			return;
		};
		callback(body);
	
	});
}

function  parsePhilosopherLinks(body) {
	var $ = cheerio.load(body);
	$($('h2:contains(Alphabetical)').next().find('li')).each(function(index, item) {
		console.log($(item).text());
		return;
	});
};
	
function getPhilosopherInfo(name, callback) {
	var url = 'https://en.wikipedia.org/wiki/' + name.replace(' ','_');
	request.get(url, function(err, resp, body) {
		if (err){
			console.log('error finding philosophers page');
			return;
		}
		var queryString = ['Born','Died','Influences','Influenced'].map(function(item){
			return 'th:contains(' + item + ')'
		}).join();
		$ = cheerio.load(body);
		var infobox = $('table.infobox');
		$(infobox).find(queryString).each(function(index, item){
			console.log($(item).text());
			console.log($(item).next().text().trim() + '\r\n');
			return;
		});
		return;
	});
	return;	
}

//var url = 'https://en.wikipedia.org/wiki/List_of_social_and_political_philosophers'
//getPage(url, parsePhilosopherLinks);
getPhilosopherInfo('Karl Marx', function(){});
