var express = require('express');
var path = require('path');

var runScraper = require('./scraper').runScraper;

var app = express();

app.set('post', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/testing', function(req,res){
	res.send('1,2,3...');
});
app.get('/test_app', function(req, res){
	res.render('index', {
		title: 'TITLE'
	});
})


app.get('/run_scraper/', runScraper);

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
