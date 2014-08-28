var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection server:'));

db.once('open', function callback () {
	console.log('calling once');
});


exports.db = db;
exports.disconnect = function(){
	mongoose.disconnect();
	return;
}
