(function(){
	var app = angular.module('philososcraper', []);

	app.controller('philListController', function(){
		this.title = 'list of philosophers';
		this.philosophers = philosophers;
	});
	var philosophers = [{
			"born" : 1896,
			"died" : 1948,
			"name" : "Antonin Artaud"
		},
		{
			"name" : "Albericus Gentilis"
		},
		{
			"born" : 1821,
			"died" : 1867,
			"name" : "Charles Baudelaire"
		}
	];
})();
