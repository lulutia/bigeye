require.config({
	baseUrl: 'modules',
	paths: {
		'Directive'   	:   '../directive',
		'Services'		:   '../services',
		'Router'		: 	'../router',
		'angular'		:   '../lib/bower_components/angular/angular',
		'jquery'		:   '../lib/bower_components/jquery/dist/jquery.min',
		'uiRouter'		: 	'../lib/bower_components/angular-ui-router/release/angular-ui-router',
		'bootstrap'		: 	'../lib/bower_components/bootstrap/dist/js/bootstrap',
		'app'			: 	'../app',
		'appCtrl'		: 	'../appCtrl',
		'appInit'		: 	'../appInit'
		},
	shim: {
		'angular': {
			'deps': ['jquery'],
			'exports': 'angular'
		},
		'uiRouter': {
			'deps': ['angular']
		},
		'bootstrap': {
			'deps': ['jquery'],
			'exports': 'bootstrap'
		}
	}
});

require(['app', 'angular', 'bootstrap', 'appInit'], function(app, angular) {
    angular.element(document).ready(function() {
        angular.bootstrap(document, [app.name, function() {
            angular.element(document).find('html').addClass('ng-app');
        }], {
            strictDi: true
        });
    });
});