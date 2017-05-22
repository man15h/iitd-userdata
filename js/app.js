var app = angular.module('myApp', ['ngMaterial','ngAnimate','ngRoute']);
app.controller('studentsCtrl', function($scope, $http, $q, $timeout, $mdDialog, $rootScope) {
  $http.get("js/student.json").then(function (response) {
    $scope.students = response.data;
  })
  $scope.gradients=[{
      'start':'#f095ff',
      'end':'#f64848'
    },
    {
      'start':'#e8c3fd',
      'end':'#86c5fc'
    },
    {
      'start':'#64a1ff',
      'end':'#88fcfe'
    },
    {
      'start':'#9abded',
      'end':'#80f9b7'
    },
    {
      'start':'#f095ff',
      'end':'#f64848'
    },
    {
      'start':'#d278f2',
      'end':'#fcc989'
    },
    {
      'start':'#f095ff',
      'end':'#f64848'
    },
    {
      'start':'#f5d961',
      'end':'#fe9c88'
    }
  ];
  $scope.gradient = $scope.gradients[Math.floor(Math.random()*$scope.gradients.length)];
  console.log($scope.gradient);
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
  $scope.selectedItemChange=function (student, ev) {
    var url='https://api.adorable.io/avatars/285/hes';
    $http({
         method: "GET",
         headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
         url: url
       }).then(function successCallback(response) {
         $scope.studentImg=response.data
       }, function errorCallback(error) {
     });
    if(student!=undefined){
      $mdDialog.show({
        controller: function ($mdDialog) {
          var vm = this;
          vm.info = {};
          vm.info = student;  //your task object from the ng-repeat

          $scope.hide = function () {
            $mdDialog.hide();
          };
          $scope.cancel = function () {
            $mdDialog.cancel();
          };
        },
        controllerAs: 'infomodal',
        templateUrl: 'templates/datapopup.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
      }, function() {
      });
    }
  };
});
app.controller('facultyCtrl', function($scope, $http) {
  $http.get("js/faculty.json").then(function (response) {
    $scope.faculty = response.data;
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
