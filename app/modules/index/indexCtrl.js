define(['app', './indexService'], function(app){
	app.controller('indexCtrl', indexCtrl);
	indexCtrl.$inject = ['$scope'];
	
	function indexCtrl($scope){
		$scope.name = "just for test1";
	}

	var html = "<div ng-controller='indexCtrl'><p>{{name}}</p></div>";
	
	return {_tpl: html }
})