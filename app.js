var request = require('request');
var cheerio = require('cheerio');

var parsers = require('./helpers/parsers');

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
					date = parsers.parseDate($(item).next().text());
					philosopherObj.born = date;
					break;
				case "Died":
					date = parsers.parseDate($(item).next().text());
					philosopherObj.died = date;
					break;
				case 'Influences':
					philosopherObj.Influences = parsers.parseInfluence($(item));
					break;
				case 'Influenced':
					philosopherObj.Influenced = parsers.parseInfluence($(item));
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


//var url = 'https://en.wikipedia.org/wiki/List_of_social_and_political_philosophers'
//getPage(url, parsePhilosopherLinks);
philosophers = "Plato,Aristotle,Epicurus,Thomas Aquinas,Thomas Hobbes,John Locke,David Hume,George Berkeley,Jeremy Bentham,Francis Place,James Mill,Harriet Taylor Mill,Adam Smith,David Ricardo,Alexis de Tocqueville,Wilhelm von Humboldt,Johann Wolfgang von Goethe,Alexander Bain,Isidore Auguste Marie François Xavier Comte,Claude Henri de Rouvroy, comte de Saint-Simon,Utopian socialism,Jean-François Marmontel,William Wordsworth,Samuel Taylor Coleridge".split(',');
philosophers.forEach(function(item){
	getPhilosopherInfo(item, function(){});
});
