(function(){
	var app = angular.module('philososcraper', []);

	app.controller('philListController', ['$http', '$scope',function($http, $scope){
		this.title = 'list of philosophers';
		var controller = this;
		$scope.philosophers = [];
		$scope.testName = 'Wiliam';
		$http({ method: 'GET', url:'/ajax/philosophers'}).success(function(data) {
			$scope.philosophers = data;
		});
	}]);
	app.directive('myD3', function(){
		return {
			restrict: 'E',
			template: '<ul><li ng-repeat="philosopher in philosophers"> Name: {{philosopher.name}}</li></ul>',
			}
	});

})();
