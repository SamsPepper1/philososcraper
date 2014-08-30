var Philosopher = require('./database/schemas/philosopher').Philosopher;


function getAllLinkedPhilosophers(req,res) {
	Philosopher.find({'influences': {$nin: [[], null]}})// this gets all philosophers who we have scraped influencs for
		.select('name born died')//only want these fields
		.sort('born')	// sort by yaer of birth
		.exec(function(err, philosophers) {
			if (err) {
				console.log(err);
			}
			res.json(philosophers);
		}
	);
};

exports.getAllPhilosophers = getAllLinkedPhilosophers;
