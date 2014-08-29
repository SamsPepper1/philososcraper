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



function linkInfluences(callback) {
	Philosopher.find(function(err, philosophers) {
		if (err) {
			return callback(err);
		}
		async.each(philosophers, function(philosopher, cb){
			linkInfluence(philosopher, cb);
		}, function(err) {
			if (err) {console.log('error: ' + err)};
			callback(err);
		});
	});
}

function linkInfluence(philosopher, callback) {
	async.map(philosopher.influences, function(influence, cb) {
		Philosopher.findOneAndUpdate({name: influence},{},{upsert:true}, function(err, influencedPhilosopher) {
			cb(err, influencedPhilosopher._id);
		})
	}, function(err, results) {
		if (err) {
			console.log("error: " + err);
			return callback(err);
		}
		philosopher.influenceIds = results;
		philosopher.save(function(err, philosopher) {
			if (err) console.log('error: ' + err);
			callback(err);
		})
	});
};

exports.getPage = getPage;
exports.linkInfluences = linkInfluences;
