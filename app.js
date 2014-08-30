var express = require('express');
var path = require('path');

var runScraper = require('./scraper').runScraper;

var app = express();


app.get('/testing', function(req,res){
	res.send('1,2,3...');
});
app.get('/test_app', function(req, res){
	res.sendfile(path.join(__dirname ,'/public/index.html'));	
})


app.get('/run_scraper/', runScraper);

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
