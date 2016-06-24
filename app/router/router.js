define([
	'app'
], function(app){
	app.config(configure);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider){

		$stateProvider
			.state('app', {
				abstract: true,
				url: '/app',
				templateUrl: 'tpl/nav.html'
			})
			.state('app.index', {
                url: '/index',
                templateProvider: tplProvider('index/indexCtrl')
            });

        $urlRouterProvider.otherwise('/app/index');
		$locationProvider.html5Mode(true);
	}
})