var request = require('request');

var Philosopher = require('../database/schemas/philosopher').Philosopher;
var parseLinks = require('../helpers/parsers').parsePhilosopherLinks;

function getPage(url, callback) {
	request.get(url, function(err, resp, body){
		if (err) {
			console.log('had an error');
			console.log(err);
			return;
		};
		var links = parseLinks(body);
		links.each(function(index, name) {
			Philosopher.findOne({ name: name}, function(err, philosopher){
				if (err) {
					console.log('error: ' + err);
					return;
				}
				if (philosopher){
					console.log('already have ' + philosopher.name);
					return;
				}
				var philosopher = new Philosopher({ name: name, isScraped: false})
				philosopher.save(function(err, philosopher) {
					if (err) {
						console.log('error: ' + err);
						return;
					}
					console.log('saved ' + philosopher.name);
				});
			});
		});
	
	});
}


exports.getPage = getPage;
