angular.module('MainService', []).factory('Main', ['$http', function($http,$q) {

	var records = [];
	/*return {
	 getAllRecords :function(){
			
			return $http({
				  method: 'GET',
				  url: '/api/records'
				}).then(function successCallback(response) {
				    // this callback will be called asynchronously
				    // when the response is available
				    records = response.data;
	  				return records;
				  
				  }, function errorCallback(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				    console.log("in error"+response);
				  });

				
				}					 
			}*/

	return {
		searchRecords:function (searchCriteria) {
			// body...
			
			return $http({
					method:'POST',
					url:'/search',
					data: searchCriteria
				}).then(function successCallback(response){
					records = response.data;
					return records;
				}, function errorCallback(response){
					console.log("error");
				});

	}
}

}]);


	


