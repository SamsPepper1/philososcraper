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

		var philosopherObj = {
			name:name
		}
		var queryString = ['Born','Died','Influences','Influenced'].map(function(item){
			return 'th:contains(' + item + ')'
		}).join();

		$ = cheerio.load(body);
		var infobox = $('table.infobox');
		$(infobox).find(queryString).each(function(index, item){
			var title = $(item).text().trim();
			switch (title) {
				case "Born":
					date = parseDate($(item).next().text());
					philosopherObj.born = date;
					break;
				case "Died":
					date = parseDate($(item).next().text());
					philosopherObj.died = date;
					break;
				case 'Influences':
					philosopherObj.Influences = parseInfluence($(item));
					break;
				case 'Influenced':
					philosopherObj.Influenced = parseInfluence($(item));
					break;

				default:
					//...
			}
			return;
		});
		console.log(philosopherObj);
		return;
	});
	return;	
}

function parseInfluence(item) {
	links = item.next().find('li a');
	if (links) {
		return links.map(function(){
			return this.attribs.title;
		}).toArray();
	}
	return [];
}


function parseDate(string){
	var dateRE =  /\d{1,2} \w+ \d{4}/;
	return dateRE.exec(string)[0];
}



//var url = 'https://en.wikipedia.org/wiki/List_of_social_and_political_philosophers'
//getPage(url, parsePhilosopherLinks);
philosophers = ['Karl Marx','Thomas Hobbes','Alan Ryan', 'John Stuart Mill']

philosophers.forEach(function(item){
	getPhilosopherInfo(item, function(){});
});
