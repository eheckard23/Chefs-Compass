// takes in name and array of dependencies
angular.module('MyApp', [])
	// takes in name of controller and function
	.controller('MyController', ($scope) => {
		$scope.test = 'Blargh';

		$scope.counter = 0;

		$scope.onCount = () => {
			$scope.counter ++;
		}

		$scope.countWords = (str) => {
			if(!str.length) return 0;
			let tmp = str.split(" ");
			return tmp.length;
		}

		// *********************

		$scope.student = {};
		$scope.studentArray = [];

		$scope.onSave = () => {
			$scope.studentArray.push($scope.student);
			$scope.student = {};
			console.log($scope.studentArray);
		}

	});