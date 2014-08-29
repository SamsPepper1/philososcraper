var express = require('express');
var runScraper = require('./scraper').runScraper;

var app = express();


var path_to_here = require('path').dirname(require.main.filename);
app.get('/testing', function(req,res){
	res.send('1,2,3...');
});
app.get('/test_app', function(req, res){
	res.sendfile(path_to_here + '/public/index.html');	
})


app.get('/run_scraper/', runScraper);

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
