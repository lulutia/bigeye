define(['app', './indexService', 'jquery'], function(app){
	app.controller('indexCtrl', indexCtrl);
	indexCtrl.$inject = ['$scope'];

	function indexCtrl($scope){
		$scope.name = "just for test1";	
	}

	$.ajax({   
       type: 'post',  
       url: '/app/index',   
       data: {page:1},   
       dataType: 'json',  
       success:function (data){  
           result = data; 
           console.log(result); 
       },    
       error: function () {  
           console.log("Save error!");  
       }  
  
   });  
	var html = "<div ng-controller='indexCtrl'><p>{{name}}</p></div>";
	
	return {_tpl: html }
})