var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var Philosopher = require('../database/schemas/philosopher').Philosopher;
var parsers = require('../helpers/parsers');

function scrapeAll(callback) {
	Philosopher.find({},function(err, philosophers) {
		async.eachSeries(philosophers, function(philosopher,cb) {
			if (philosopher.isScraped){
				cb();
			} else {
				getPhilosopherInfo(philosopher.name, function(err, philosopher) {
					cb(err);
				});
			};
		}, function(err){
			if (err) console.log('error: ' + err);
			callback(err);
		});
	});
}

	
function getPhilosopherInfo(name, callback) {
	var url = 'https://en.wikipedia.org/wiki/' + name.replace(' ','_');
	request.get(url, function(err, resp, body) {
		if (err){
			return;
		}

		var philosopherObj = {
			name:name,
			isScraped: true
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
					philosopherObj.influences = parsers.parseInfluence($(item));
					break;
//				case 'Influenced':
//					philosopherObj.Influenced = parsers.parseInfluence($(item));
//					break;

				default:
					//...
			}
			return;
		});
		Philosopher.findOne({name: name}, function(err, philosopher){
			if (err || !philosopher) {
				console.log('error: ' + err || 'could not find');
				callback(err, philosopher);
			} else {
				philosopher.born = philosopherObj.born;
				philosopher.died = philosopherObj.died;
				philosopher.influences = philosopherObj.influences;
				philosopher.isScraped = true;
				philosopher.save(function (err, philosopher) {
					if (err) return console.error(err);
						callback(err, philosopher);
				});
			}
		});
	});
	return;	
}

exports.getPhilosopherInfo = getPhilosopherInfo;
exports.scrapeAll = scrapeAll;
