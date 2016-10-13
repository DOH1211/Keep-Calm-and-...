
angular.module('keepCalmApp', ['ngRoute'])

.config(function($routeProvider, $httpProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'pages/search.html',
      controller: 'pageController'
    })
    .otherwise({
      redirectTo: '/'
    });
})

.service('searchWords', function() {
  this.words = ". . .";
})
.factory('task', function ($http, searchWords) {
  var getImage = function () {
    if (searchWords.words === "") searchWords.words = "hug";
    return $http({
      method: 'GET',
      url: '/api',
      params: {word: searchWords.words}
    });
  };

  return {
    getImage: getImage
  };
})
.controller('pageController', function($scope, $location, task, searchWords) {
  $scope.words = searchWords.words;
  $scope.imgBg;

  $scope.$watch('words', function() {
    searchWords.words = $scope.words;
  });

  $scope.submit = function() {
    task.getImage()
    .then(function (data) {
        console.log(data.data);
        $scope.imgBg = data.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

})


