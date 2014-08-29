var parsePhilosopherLinks = require('./helpers/parsers').parsePhilosopherLinks;
var getPage = require('./scraper/philosopherList').getPage
var Philosopher = require('./database/schemas/philosopher').Philosopher;
var scrapeAll = require('./scraper/philosopher').scrapeAll;
var linkInfluences = require('./scraper/philosopherList').linkInfluences;
var db = require('./database/mongodb').db;
var disconnect = require('./database/mongodb').disconnect;

var async = require('async');

var url = 'https://en.wikipedia.org/wiki/List_of_social_and_political_philosophers'

async.series([
	function(callback) {
		console.log('starting list scrape');
		getPage(url, callback);
	},
	function(callback) {
		console.log('getting philosopher info');
		scrapeAll(callback);
	},
	function(callback) {
		console.log('linking influences');
		linkInfluences(callback);
	},
	function(callback) {
		disconnect(callback);
	}
])

