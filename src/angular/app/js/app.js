var app = angular.module("myApp", ['ngResource', 'ngCookies'])

app.config(function ($httpProvider, $routeProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    }
    
    $routeProvider.
    when('/', {templateUrl: 'templates/team.html',   controller: "TeamCtrl"}).
    when('/player/:playerId', {templateUrl: 'templates/player.html', controller: "PlayerCtrl"}).
    otherwise({redirectTo: '/'});
});



app.factory('TeamData', function($resource){
	return $resource('/main/team/:teamName', {}, {
		query: {method:'GET', isArray:true}
	})
});

app.factory('PlayerData', function($resource){
	return $resource('/main/player/:playerId', {}, {
		query: {method:'GET'}
	})
});

app.factory('NewPlayer', function($resource, $cookies){
	var token = $cookies['csrftoken'];
	return $resource('/main/player/add', {}, {
		save: {method:'POST', headers:{'X-CSRFToken' : token}, isArray:true}
	})
});

app.controller("TeamCtrl", function($scope, $filter, TeamData, NewPlayer) {
	$scope.model = {team:'Penguins', players:TeamData.query({teamName:$filter('uppercase')('Penguins')})};
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
});

app.controller("PlayerCtrl", function($scope, $routeParams, PlayerData) {
	$scope.model = {player:PlayerData.get({playerId:$routeParams.playerId})};
	
});

app.directive("home", function() {
	return {
		restrict: "E",
		template: "<a class='btn btn-inverse' href='#'>Home</div>"
	}
});