var app = angular.module("myApp", ['ngResource', 'ngCookies'])

app.config(function ($httpProvider, $routeProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
	//Transform the json objects to name value pairs (ex:  title=MyTitle&department=Development)  because this is what Django is expecting.
    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    }
    
    //Define url routing
    $routeProvider.
    when('/', {templateUrl: 'templates/team.html',   controller: "TeamCtrl"}).
    when('/player/:playerId', {templateUrl: 'templates/player.html', controller: "PlayerCtrl"}).
    otherwise({redirectTo: '/'});
});


/**
 * Team service
 */
app.factory('Team', function($resource){
	return $resource('/main/team/:teamName', {}, {
		query: {method:'GET', isArray:true}
	})
});

/**
 * Player service
 */
app.factory('Player', function($resource, $cookies){
	var token = $cookies['csrftoken'];
	return $resource('/main/player/:playerId', {'playerId':0}, {
		query: {method:'GET'},
		save: {method:'POST', headers:{'X-CSRFToken' : token}, isArray:true}
	})
});


app.controller("TeamCtrl", function($scope, Team, Player) {
	$scope.model = {team:'Penguins', players:Team.query({teamName:'Penguins'})};
	$scope.player = {};
	
	$scope.getPlayers = function() {
		 $scope.model.players = Team.query({teamName:$scope.model.team});
	}
	
	$scope.addPlayer = function() {
		$scope.model.players = Player.save($scope.player, function(data){
			$scope.model.team = $scope.player.team;
			$scope.player = {};
		});
	}
});

app.controller("PlayerCtrl", function($scope, $routeParams, Player) {
	$scope.model = {player:Player.get({playerId:$routeParams.playerId})};
	
});

app.directive("home", function() {
	return {
		restrict: "E",
		template: "<a class='btn btn-inverse' href='#'>Home</div>"
	}
});

/**
 * This directive adds a popup to with the team logo.  This directive is much easier and cleaner than the 
 * jquery alternative pasted below.  Because these elements are dynamic, jqueyr would have to attach them each time
 * they are loaded, but this is not easy or not possible to do with jquery so we attach a listener to its parent object
 * We are then forced to call the popover show and hide manually since we our listener is on the parent rather than just
 * adding a trigger of hover directly to the element
 * 
 * With angular, this directive is called each time the element is created, so we have direct access to the element
 * 
 * <script type="text/javascript">
 *			$(document).ready(function() {
 *				$("#players").on('mouseenter mouseleave', 'span', function(event) {
 *				     if (event.type == 'mouseenter') {
 *				    	 var img = '<img src="img/' + $(this).val() + '.png" />';
 *				    	 $(this ).popover({title:$(this).val(), content:img, html:true});
 *				         $(this ).popover('show');
 *				     } else  {
 *				         $(this ).popover('hide');
 *				     }
 *				});
 *			});
 *	</script>	
 */
app.directive("teamLogo", function() {
	return { 
		restrict: "E",
		scope: {
			team: "@"
		},
		template: "<span>{{team}}</span>",
		link: function(scope, element, attrs) {
			var html = '<img src="img/' + scope.team + '.png" />';
			element.popover({trigger:'hover', title:scope.team, content:html, html:true});
		}
	}
});

/**
 * Deprecated in favor of above element team logo (this one is used as an attribute)
 */
app.directive("teamLogo-deprecated", function() {
	return function (scope, element, attrs) {
		var html = '<img src="img/' + attrs.teamLogo + '.png" />';
		element.popover({trigger:'hover', title:attrs.teamLogo, content:html, html:true});
	}
});



