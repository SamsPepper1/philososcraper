var request = require('request');
var cheerio = require('cheerio');

var Philosopher = require('../database/schemas/philosopher').Philosopher;
var parsers = require('../helpers/parsers');

	
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
//				case 'Influences':
//					philosopherObj.Influences = parsers.parseInfluence($(item));
//					break;
//				case 'Influenced':
//					philosopherObj.Influenced = parsers.parseInfluence($(item));
//					break;

				default:
					//...
			}
			return;
		});
		var philosopher = new Philosopher(philosopherObj);
		philosopher.save(function (err, philosopher) {
			if (err) return console.error(err);
			callback(err, philosopher);
		});
	});
	return;	
}

exports.getPhilosopherInfo = getPhilosopherInfo;
