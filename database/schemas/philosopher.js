var mongoose = require('mongoose');

var philosopherSchema = mongoose.Schema({
	name: String,
	url: String,
	born: Number,
	died: Number,
	isScraped: Boolean,
	influences: [String],
	influenceIds: [{type: mongoose.Schema.ObjectId}]
	
})


exports.Philosopher = mongoose.model('Philosopher',philosopherSchema);
