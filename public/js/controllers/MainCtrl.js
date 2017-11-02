angular.module('MainCtrl', []).controller('MainController', function($scope,Main) {

	var searchObj= {};
	$scope.date = {};

	$scope.search = function(){
		//with all four inputs
		if($scope.filename && $scope.aliases && $scope.startDate && $scope.endDate && $scope.exchangeName && $scope.exchangeDistance){

			searchObj['filename'] = $scope.filename;
			searchObj['aliases'] = $scope.aliases;

			searchObj['startDate'] = getISODate($scope.date.startdt);
			searchObj['endDate'] = getISODate($scope.date.enddt);

			searchObj['exchangeName'] = $scope.exchangeName;
			searchObj['exchangeDistance'] = $scope.exchangeDistance;

		}
		else if($scope.filename){
			searchObj['filename'] = $scope.filename;
		}
		else if($scope.aliases){
			searchObj['aliases'] = $scope.aliases;
		}
		else if($scope.exchangeName ){
			
		searchObj['exchangeName'] = $scope.exchangeName;
	
		}
		else if($scope.exchangeDistance ){
			
		searchObj['exchangeDistance'] = $scope.exchangeDistance;
	
		}
		else if($scope.exchangeName && $scope.exchangeDistance){

			searchObj['exchangeName'] = $scope.exchangeName;
			searchObj['exchangeDistance'] = $scope.exchangeDistance;
		}
		else if($scope.date.startdt && $scope.date.enddt){
			
		searchObj['startDate'] = getISODate($scope.date.startdt);
		searchObj['endDate'] = getISODate($scope.date.enddt);
		}
		else if($scope.date.startdt ){
			
		searchObj['startDate'] = getISODate($scope.date.startdt);
	
		}
		else if($scope.date.enddt ){
			
		searchObj['endDate'] = getISODate($scope.date.enddt);
	
		}
		else
		{
			alert("Please select any of the text boxes");
		}
		console.log(searchObj);
		
		Main.searchRecords(searchObj).then(function(results){
			console.log(results);
			$scope.results = results;
			$scope.aliases = '';
			$scope.filename= '';
			$scope.image_url = '';	
			$scope.exchangeDistance= '';
			$scope.exchangeName= '';
			$scope.date = {};
			searchObj = {};

		});

	}
	function getISODate(date){

		var iso_date = date.toISOString();
		return iso_date;
		
	}


});