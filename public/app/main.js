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


				var width = 3000;
				var height = 3000;
				var offset = -700;
				// make svg and main graph layer
				var graph = d3.select(element[0])
					.append('svg')
					.attr("width", width)
					.attr("height", height)
					.append('g');

				//create label layer
				var labels = d3.select('svg').append('g');


				function removeLabels() {
					labels.selectAll('text').remove();
					return;
				};
				// make x axis
				var years = [];
				for (var i = offset; i < 2020; i += 100){
					years.push(i);
				}
				var point = graph.selectAll('.label')
					.data(years)
					.enter().append('g');
				point.append('rect')
					.attr("x", 0)
					.attr("y", function(d) { return d - offset })
					.attr("height",5)
					.attr("width", width)
					.style("fill", "blue")

				point.select('rect').on("mouseover", function(d) {
					labels.append("text")
						.attr("dx", d3.event.pageX)
						.attr("dy", d - offset + 20)
						.text(yearToString(d))
					return;
				})
				point.select('rect').on("mouseout",removeLabels); 				

				//this stuff needs to be done here to change with philosophers selected
				scope.$watch('philosophers',function(newVal, oldVal) {
					graph.selectAll(".philosopher").remove();
					var node = graph.selectAll(".philosopher")
					.data(scope.philosophers)
					.enter().append('g')
					
					node.append("rect")
					.style("stroke", "black")
					.style("fill", "red")
					.style("opacity", 0.6)
					.attr("width", 5)
					.attr("height", function(d,i){ return d.died? d.died - d.born: height})
					.attr("x", function(d,i){ return 5*i})
					.attr("y", function(d,i){ return d.born - offset})

					node.on("mouseover", function(d) {
						d3.select(this)
							.select('rect')
							.style('opacity',1);
						labels.append('svg:text')
						.style("fill", "black")
						.attr("dx", function(){ return d3.event.pageX})
						.attr("dy",function() { return d.born - offset + 5})
						.text(function(){ return d.name + " lived from " + yearToString(d.born) + " to " + yearToString(d.died) + "."});
					});
					
					node.on("mouseout",function(d) {
					 	d3.select(this)
							.select('rect')
							.style('opacity', 0.6);
						console.log(d);
						removeLabels();
					})
					return;
				});
				return;
			},
		}
	});

	function yearToString(year) {
		var s = Math.abs(year).toString();
		s += year >= 0? ' AD': ' BC';
		return s;
	}

})();
