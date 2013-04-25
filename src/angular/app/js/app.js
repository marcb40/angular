var app = angular.module("myApp", ['ngResource'])

app.factory('TeamData', function($resource){
	return $resource('/main/team/:teamName', {}, {
		query: {method:'GET', isArray:true}
	})
})

app.controller("TeamCtrl", function($scope, $filter, TeamData) {
	$scope.model = {team:'Penguins', players:[]};
	
	$scope.getPlayers = function() {
		 $scope.model.players = TeamData.query({teamName:$filter('uppercase')($scope.model.team)});
	}
})

app.directive("team", function() {
	return {
		restrict: "E",
		template: "<div>team element</div>"
	}
})