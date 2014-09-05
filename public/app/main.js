(function(){
	var app = angular.module('philososcraper', []);
	
	app.controller('philListController', ['$http', '$scope',function($http, $scope){
		this.title = 'list of philosophers';
		var controller = this;
		$scope.philosophers = [];
		$scope.testName = 'Wiliam';
		$scope.yearFunction = logarithmicYear;
		$http({ method: 'GET', url:'/ajax/philosophers'}).success(function(data) {
			$scope.philosophers = data;
		});
	}]);
	app.directive('myD3', function(){
		return {
			restrict: 'E',
			scope: {
				philosophers: '=',
				yearFunction: "="
				},
			link: function(scope, element, attrs) {


				var width = 3000;
				var height = 3000;
				var offset = -700;
				var yearFunction = logarithmicYear;
				console.log(scope);
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
				// add two rectangles, one invisible for capturing clicks

				point.append('rect')
					.attr("x", 0)
					.attr("y", function(d) { return yearFunction(d) - offset })
					.attr("height",2)
					.attr("width", width)
					.style("fill", "blue")
				point.append('rect')
					.attr('class', 'hoverable')
					.attr("x", 0)
					.attr("y", function(d) { return yearFunction(d) - offset - 5 })
					.attr("height",12)
					.attr("width", width)
					.attr("opacity", 0.1);

				point.select('rect.hoverable').on("mouseover", function(d) {
					labels.append("text")
						.attr("dx", d3.event.pageX)
						.attr("dy", yearFunction(d) - offset + 20)
						.text(yearToString(d))
					return;
				})
				point.select('rect.hoverable').on("mouseout",removeLabels); 				

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
					.attr("height", function(d,i){ return d.died? yearFunction(d.died) - yearFunction(d.born): yearFunction(2014) - yearFunction(d.born)})
					.attr("x", function(d,i){ return 5*i})
					.attr("y", function(d,i){ return yearFunction(d.born) - offset})

					node.on("mouseover", function(d) {
						text = d.name + " lived from " + yearToString(d.born) + " to "
						text += d.died? yearToString(d.died) + '.': 'the present day.'
						d3.select(this)
							.select('rect')
							.style('opacity',1);
						labels.append('svg:text')
						.style("fill", "black")
						.attr("dx", function(){ return d3.event.pageX})
						.attr("dy",function() { return yearFunction(d.born) - offset + 5})
						.text(text);
					});
					
					node.on("mouseout",function(d) {
					 	d3.select(this)
							.select('rect')
							.style('opacity', 0.6);
						removeLabels();
					})
					return;
				});
				return;
			},
		}
	});


	function logarithmicYear(year){
		return  2000-( Math.log(2050-year) * 300);
	}

	function linearYear(year) {
		return year;	
	}
	var yearFunctions = {
		'logarithmic': logarithmicYear,
		'linear': linearYear

	}	

	function yearToString(year) {
		var s = Math.abs(year).toString();
		s += year >= 0? ' AD': ' BC';
		return s;
	}

})();
