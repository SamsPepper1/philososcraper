var Philosopher = require('./database/schemas/philosopher').Philosopher;
var BSON = require('mongodb').BSONPure;

function getAllLinkedPhilosophers(req,res) {
	Philosopher.find({'influences': {$nin: [[], null]}})// this gets all philosophers who we have scraped influencs for
		.select('name born died')//only want these fields
		.sort('born')	// sort by yaer of birth
		.exec(function(err, philosophers) {
			if (err) {
				console.log(err);
				res.end(err)
				return;
			}
			res.json(philosophers);
	});
};

function getAllPhilosophers(req,res) {
	Philosopher.find()
		.select('name born died')
		.sort('born')
		.exec(function(err, philosophers) {
			if (err) {
				console.log(err)
				res.end(err);
				return;
			}
			res.json(philosophers);
	});	
};


function getPhilosopherById(req,res) {
	Philosopher.findOne(new BSON.ObjectID(req.params.id))
		.select('name born died')
		.sort('born')
		.exec(function(err, philosopher) {
			if (err) {
				console.log(err);
				res.end(err);
				return;
			}
			res.json(philosopher);
	});
};

exports.getPhilosopherById = getPhilosopherById;
exports.getAllPhilosophers = getAllLinkedPhilosophers;
