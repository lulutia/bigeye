define([
	'app',
	'appCtrl',
	'Router/router'
], function(app) {
	app.config(['$provide', '$controllerProvider', '$filterProvider', '$compileProvider',
		function($provide, $controllerProvider, $filterProvider, $compileProvider) {

			app.factory = function() {
				$provide.factory.apply(null, arguments);
			};

			app.service = function() {
				$provide.service.apply(null, arguments);
			};

			app.filter = function() {
				$filterProvider.register.apply(null, arguments);
			};

			app.directive = function() {
				$compileProvider.directive.apply(null, arguments);
			};

			app.controller = function() {
				$controllerProvider.register.apply(null, arguments);
			};

			app.provider = function() {
				$provide.provider.apply(null, arguments);
			};
		}
	]);

})