
var app = angular.module('myApp', []);
app.controller('studentsCtrl', function($scope, $http) {
    $http.get("student.json")
    .then(function (response) {$scope.students = response.data;})

    .success(function(data, status, headers, config) {
      $scope.posts = data;
    }).
    .error(function(data, status, headers, config) {
      $scope.posts = error in recieving data;
    });


    
});
