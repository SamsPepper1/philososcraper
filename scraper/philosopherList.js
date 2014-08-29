var request = require('request');

var Philosopher = require('../database/schemas/philosopher').Philosopher;
var parseLinks = require('../helpers/parsers').parsePhilosopherLinks;
var async = require('async');

function getPage(url, callback) {
	request.get(url, function(err, resp, body){
		if (err) {
			callback(err);
			return;
		};
		var links = parseLinks(body);
		async.each( links, function(name, cb) {
			Philosopher.findOne({ name: name}, function(err, philosopher){
				if (err) {
					cb(err);
					return;
				}
				if (philosopher){
					cb();
					return
				}
				var philosopher = new Philosopher({ name: name, isScraped: false})
				philosopher.save(function(err, philosopher) {
					if (err) {
						cb(err);
						return;
					}
					cb();
				});
			});
		}, function(err,result) {
			callback(err)
		});
	
	});
}


exports.getPage = getPage;
