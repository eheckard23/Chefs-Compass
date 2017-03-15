// takes in name and array of dependencies
angular.module('MyApp', [])
	// takes in name of controller and function and service
	.controller('MyController', ($scope, MyService) => {
		$scope.test = 'Blargh';

		$scope.counter = 0;//localStorage.getItem('counterLS');

		$scope.onCount = () => {
			$scope.counter ++;
			// set item with name and value
			localStorage.setItem('counterLS', $scope.counter)
		}

		$scope.countWords = (str) => {
			if(!str.length) return 0;
			let tmp = str.split(" ");
			return tmp.length;
		}

		// *********************

		$scope.student = {};
		$scope.studentArray = MyService.getStudents();

		$scope.onSave = () => {
			// $scope.studentArray.push($scope.student);
			MyService.addStudent($scope.student);
			$scope.student = {};
			console.log($scope.studentArray);
		}

		$scope.eliminateStudentAt = (pIdx) => {
			MyService.removeStudentAt(pIdx);
			console.log($scope.studentArray);
		}

	})
	// add a model
	// no arrow function for adding service model
	.service('MyService', function(){

		let studentArray = [];

		this.getStudents = () => {
			let str = localStorage.getItem('studentLS');
			studentArray = JSON.parse(str) || studentArray;
			return studentArray;
		}
		// push students to array
		this.addStudent = (pStudent) => {
			studentArray.push(pStudent);
			let str = JSON.stringify(studentArray);
			localStorage.setItem('studentLS',str);
		}

		this.removeStudentAt = (pIdx) => {
			studentArray.splice(pIdx,1);
			let str = JSON.stringify(studentArray);
			localStorage.setItem('studentLS',str);
		}
	})
	// cookies have an expiration date, sent back to server on each request
	// local storage and cookies store only strings





