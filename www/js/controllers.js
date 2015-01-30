var controllers = angular.module('controllers', [])

controllers.controller('AppCtrl', function($scope, DBService, PrayersService, CategoriesService) {
  DBService.load()
  CategoriesService.load()
  PrayersService.load()
})

controllers.controller('CategoriesCtrl', function($scope, $stateParams, CategoriesService) {
  $scope.categories = CategoriesService.categories
})

controllers.controller('CategoryCtrl', ['$scope', '$stateParams', 'PrayersService', 'CategoriesService', function($scope, $stateParams, PrayersService, CategoriesService) {
  $scope.prayers = PrayersService.prayers
    .filter(function(a){return a.categoryId == $stateParams.categoryId})
  $scope.category = CategoriesService.categories
    .filter(function(a){return a.id == $stateParams.categoryId})[0]

  $scope.letterCount = function (prayer) {
    s = prayer.body
    s = s.replace(/(^\s*)|(\s*$)/gi,"")
    s = s.replace(/[ ]{2,}/gi," ")
    s = s.replace(/\n /,"\n").split(" ")
    return s.length
  }
}])

controllers.controller('PrayersCtrl', ['$scope', '$stateParams', 'PrayersService', function($scope, $stateParams, PrayersService) {
  $scope.prayers = PrayersService.prayers

  $scope.letterCount = function (prayer) {
    s = prayer.body
    s = s.replace(/(^\s*)|(\s*$)/gi,"")
    s = s.replace(/[ ]{2,}/gi," ")
    s = s.replace(/\n /,"\n").split(" ")
    return s.length
  }
}])

controllers.controller('PrayerCtrl', ['$scope', '$stateParams', 'PrayersService', 'CategoriesService', function($scope, $stateParams, PrayersService, CategoriesService) {
  $scope.prayer = PrayersService.prayers
    .filter(function(a){return a.id == $stateParams.prayerId})[0]
}])

controllers.controller('ConfigCtrl', function() {
})
