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
			scope: {
				philosophers: '='
				},
			link: function(scope, element, attrs) {
				var graph = d3.select(element[0])
					.append('svg')
					.attr("width", 3000)
					.attr("height", 3000)
					.append('g');

				scope.$watch('philosophers',function(newVal, oldVal) {
					graph.selectAll("*").remove();
					var node = graph.selectAll(".philosopher")
					.data(scope.philosophers)
					.enter().append('g')
					
					node.append("rect")
					.style("stroke", "gray")
					.style("fill", "red")
					.attr("width", 5)
					.attr("height", function(d,i){ return d.died? d.died - d.born: 3000})
					.attr("x", function(d,i){ return 5*i})
					.attr("y", function(d,i){ return d.born + 500})

					node.on("mouseover", function() {
						d3.select(this).append('svg:text')
						.style("fill", "black")
						.attr("dx", function(d,i){ return 5*i})
						.attr("dy",function(d,i) { return d.born + 515})
						.text(function(d,i){ return d.name + "lived from " + d.born + " to " + d.died + "."});
					});
					
					node.on("mouseout", function() {
						d3.select(this).select("text").remove();
					});
					return;
				});
				return;
			},
		}
	});

})();
