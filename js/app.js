var app = angular.module('myApp', ['ngMaterial','ngAnimate','ngRoute']);
app.controller('studentsCtrl', function($scope, $http, $q, $timeout) {
  $http.get("js/student.json").then(function (response) {
    $scope.students = response.data;
    console.log(response);
  })
  $scope.getStudent = function(searchText) {
    var deferred = $q.defer();
    $timeout(function() {
        var students = $scope.students.filter(function(student) {
            return ((student.name.toUpperCase().indexOf(searchText.toUpperCase()) !== -1) || (student._id.toUpperCase().indexOf(searchText.toUpperCase())!== -1));
        });
        deferred.resolve(students);
    }, 0);
    return deferred.promise;
  };
});
app.controller('facultyCtrl', function($scope, $http) {
  $http.get("js/faculty.json").then(function (response) {
    $scope.faculty = response.data;
    console.log(response);
  })
});

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
    controller: "studentsCtrl",
    templateUrl: "templates/students.html"
  }).when("/students", {
    controller: "studentsCtrl",
    templateUrl: "templates/students.html"
  }).when("/faculty", {
    controller: "facultyCtrl",
    templateUrl: "templates/faculty.html"
  })
  .otherwise({
    controller: "studentsCtrl",
    templateUrl: "templates/error.html"
  });
}]);
