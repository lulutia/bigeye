define(['app', './indexService', 'text!./index.html'], function(app, indexService, html) {
  app.controller('indexCtrl', indexCtrl);
  indexCtrl.$inject = ['$scope', 'indexService'];

  function indexCtrl($scope, indexService) {
    $scope.name = "just for test1";
    $scope.getInitData = function() {
      indexService.getInitData().then(
        function(res) {
          if (res.status === 200) {
            var resData = res.data[0].items;
            $scope.initData = resData;
          }
        })
    };
    $scope.getInitData();
  }

  return {
    _tpl: html
  }
})