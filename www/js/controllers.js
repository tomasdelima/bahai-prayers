var controllers = angular.module('controllers', [])

controllers.controller('AppCtrl', function($scope, $ionicModal) {
})

controllers.controller('CategoriesCtrl', function($scope, $stateParams, CategoriesService) {
  CategoriesService.load().success( function(data){
    $scope.categories = data
  })
})

controllers.controller('CategoryCtrl', ['$scope', '$stateParams', 'PrayersService', 'CategoriesService', function($scope, $stateParams, PrayersService, CategoriesService) {
  PrayersService.load($stateParams.categoryId).success( function(data){
    $scope.prayers = data
  })
  CategoriesService.load().success(function(data){
    $scope.category = data.filter(function(a) { return a.id == $stateParams.categoryId })[0]
  })

  $scope.letterCount = function (prayer) {
    s = prayer.body
    s = s.replace(/(^\s*)|(\s*$)/gi,"")
    s = s.replace(/[ ]{2,}/gi," ")
    s = s.replace(/\n /,"\n").split(" ")
    return s.length
  }
}])

controllers.controller('PrayerCtrl', ['$scope', '$stateParams', 'PrayersService', 'CategoriesService', function($scope, $stateParams, PrayersService, CategoriesService) {
  PrayersService.load($stateParams.categoryId).success(function(data){
    $scope.prayer = data.filter(function(a) { return a.id == $stateParams.prayerId })[0]
    
    author = $scope.prayer.author.toLowerCase() || ''
    $scope.getAuthorFirstLetter = function () {
      if(author.search("báb")>=0 || author.search("bahá'u'lláh")>=0){
        return 'b'
      } else {
        return 'a'
      }
    }
  })
  
}])

controllers.controller('ConfigCtrl', function() {
})

