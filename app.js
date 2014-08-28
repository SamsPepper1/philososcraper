var getPhilosopherInfo = require('./scraper/philosopher').getPhilosopherInfo;

var db = require('./database/mongodb').db;
//var url = 'https://en.wikipedia.org/wiki/List_of_social_and_political_philosophers'
//getPage(url, parsePhilosopherLinks);
philosophers = "Plato,Aristotle,Epicurus,Thomas Aquinas,Thomas Hobbes,John Locke,David Hume,George Berkeley,Jeremy Bentham,Francis Place,James Mill,Harriet Taylor Mill,Adam Smith,David Ricardo,Alexis de Tocqueville,Wilhelm von Humboldt".split(',')//,Johann Wolfgang von Goethe,Alexander Bain,Isidore Auguste Marie François Xavier Comte,Claude Henri de Rouvroy, comte de Saint-Simon,Utopian socialism,Jean-François Marmontel,William Wordsworth,Samuel Taylor Coleridge".split(',');

philosophers.forEach(function(item){
	getPhilosopherInfo(item, function(err, philosopher){
		console.log('saved ' + philosopher.name);
	});
});
