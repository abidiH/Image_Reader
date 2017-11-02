angular.module('appDirectives', []).directive('file',function(){

return {
		require:"ngModel",
		restrict : 'A',
		link:function( $scope, el, attrs, ngModel){
			el.bind('change' , function(event){

				ngModel.$setViewValue(event.target.files[0]);
				$scope.$apply();
			});
			$scope.$watch(function(){
				return ngModel.$viewvalue;
				}, function(value){
					if(!value){
						el.val("");
					}
				});	
		}

	};
	

});