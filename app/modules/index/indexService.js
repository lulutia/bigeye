define(['app'], function(app) {
	app.factory('indexService', indexService);

	indexService.$inject = ['$http'];

	function indexService($http) {
		return {
			getInitData: function () {
				return $http({
					method: 'post',
					url: '/app/index'
				});
			}
		}
	}
})