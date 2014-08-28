var mongoose = require('mongoose');

var philosopherSchema = mongoose.Schema({
	name: String,
	born: String,
	died: String
})


exports.Philosopher = mongoose.model('Philosopher',philosopherSchema);
