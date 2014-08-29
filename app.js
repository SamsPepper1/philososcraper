var express = require('express');
var runScraper = require('./scraper').runScraper;

var app = express();

app.get('/testing', function(req,res){
	res.send('1,2,3...');
});


app.get('/run_scraper/', runScraper);

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
