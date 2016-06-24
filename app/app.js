define([
	'angular',
	'uiRouter'
], function(angular){
	var app = angular.module('movieApp', [
		'ui.router',
]);
	    // 挂在全局，供ui-router state定义时使用
    window.tplProvider = tplProvider;

    /**
     * 供ui-router使用的定义templateProvider的生成函数
     * @param  {string} modulePath 模块js相对于module文件夹得路径，供require异步加载使用
     * @return {array}             返回对ui-router中state的templateProvider属性的定义数组
     */
    function tplProvider(modulePath) {
        return ['$q', function ($q) {
            return $q(function (resolve) {
                require([modulePath], function (module) {
                    resolve(module._tpl);
                });
            });
        }];
    }
	return app;
})