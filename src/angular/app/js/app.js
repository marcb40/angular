var app = angular.module("myApp", ['ngResource', 'ngCookies'])

app.config(function ($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    }
});

app.factory('TeamData', function($resource){
	return $resource('/main/team/:teamName', {}, {
		query: {method:'GET', isArray:true}
	})
})

app.factory('NewPlayer', function($resource, $cookies){
	var token = $cookies['csrftoken'];
	return $resource('/main/player/add', {}, {
		save: {method:'POST', headers:{'X-CSRFToken' : token}, isArray:true}
	})
})

app.controller("TeamCtrl", function($scope, $filter, $http, $cookies, TeamData, NewPlayer) {
	$scope.model = {team:'Penguins', players:[]};
	$scope.player = {};
	
	$scope.getPlayers = function() {
		 $scope.model.players = TeamData.query({teamName:$filter('uppercase')($scope.model.team)});
	}
	
	$scope.addPlayer = function() {
		$scope.model.players = NewPlayer.save($scope.player, function(data){
			$scope.model.team = $scope.player.team;
			$scope.player = {};
		});
	}
})

app.directive("team", function() {
	return {
		restrict: "E",
		template: "<div>team element</div>"
	}
})