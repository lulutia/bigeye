define(['app'], function (app){
	app.controller('AppCtrl', appCtrl);
	appCtrl.$inject = ['$scope', '$window', '$rootScope'];

	function appCtrl($scope, $window, $rootScope){
		$scope.test = "ss";
		$scope.app = {
			name: 'just for fun'
		}
	}
})
