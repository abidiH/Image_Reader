angular.module('NerdCtrl', []).controller('NerdController', function($scope,Upload) {


	var currentDate = new Date();
	//var fd = new FormData();
	var uploadObj = {};

	$scope.upload = function(){
		if($scope.aliases ||  $scope.file || $scope.exchangeName || $scope.exchangeDistance)
		{
				
				var file = $scope.file;
				uploadObj['aliases'] = $scope.aliases;
				uploadObj['exchangeName'] = $scope.exchangeName;
				uploadObj['exchangeDistance'] = $scope.exchangeDistance;

		}
		
		console.log(uploadObj, $scope.file);
		//invoke the upload service
		
		Upload.upload({
		    url: '/upload', 
		    data: {file:$scope.file,'formData': uploadObj }
		   }).then(function (resp) {
            		console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
		      }, function (resp) {
		            console.log('Error status: ' + resp.status);
		      });
	

		//Nerd.uploadImages(uploadObj, $scope.file);
		uploadObj = {};
		$scope.aliases = "";
		$scope.file = {};
		$scope.exchangeDistance = '';
		$scope.exchangeName = '';
		
	
	};

		
});
