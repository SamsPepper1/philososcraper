(function(){
	var app = angular.module('philososcraper', []);

	app.controller('philListController', ['$http',function($http){
		this.title = 'list of philosophers';
		var controller = this;
		this.philosophers = [];
		$http({ method: 'GET', url:'/ajax/philosophers'}).success(function(data) {
			controller.philosophers = data;
		});
	}]);
	var philosophers = [];


})();
