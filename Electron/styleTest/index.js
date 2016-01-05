'use strict';
var cproc = require('child_process');
var fs = require('fs');
var demoApp = angular.module('demoApp', ['ui.bootstrap']);


demoApp.controller("loopCtrl", ["$scope", "$q", function ($scope, $q) {
	$scope.week = [
		{ "jp": "月", "en": "Monday" },
		{ "jp": "火", "en": "Tuesday" },
		{ "jp": "水", "en": "Wednesday" },
		{ "jp": "木", "en": "Thursday" },
		{ "jp": "金", "en": "Friday" },
		{ "jp": "土", "en": "Saturday" },
		{ "jp": "日", "en": "Sunday" }
	];

	$scope.dirResult = "" + cproc.execSync('dir');

	$scope.handleKeydown = function (e) {
		$scope.week.push({ "jp": "特別", "en": "Specialday" });
	};

	$scope.keydown = function ($event) {
		if ($event.keyCode == 116) {
			$scope.test = "F5が押されました。";
		} else {
			$scope.test = "その他のキーが押されました。";
		}
	};

	// ファイル読み取り
	$scope.articles = [];
	ReadFile($q, `${__dirname}/data/article.json`).then(function(object) {
		$scope.articles = JSON.parse(object);
	});
}]);


function ReadFile($q, path)
{
	var deferred =  $q.defer();
	fs.readFile(path, function (error, text) {
		if (error != null) {
			alert('error : ' + error);
			return;
		}
		deferred.resolve(text);
	});
	return deferred.promise;
}

//demoApp.controller('DropdownCtrl', function ($scope, $log) {
//	$scope.items = [
//		'The first choice!',
//		'And another choice for you.',
//		'but wait! A third!'
//	];

//	$scope.status = {
//		isopen: false
//	};

//	$scope.toggled = function (open) {
//		$log.log('Dropdown is now: ', open);
//	};

//	$scope.toggleDropdown = function ($event) {
//		$event.preventDefault();
//		$event.stopPropagation();
//		$scope.status.isopen = !$scope.status.isopen;
//	};
//});

demoApp.controller('MainCtrl', function ($scope) {
	$scope.name = 'World';
});

demoApp.controller('DropdownCtrl', function ($scope) {

	$scope.items = [
		"The first choice!",
		"And another choice for you.",
		"but wait! A third!"
	];
});
