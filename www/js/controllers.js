var controllers = angular.module('controllers', [])

controllers.controller('AppCtrl', function($scope, $ionicModal) {
})

controllers.controller('CategoriesCtrl', function($scope, $stateParams, CategoriesService) {
  $scope.categories = CategoriesService
})

controllers.controller('CategoryCtrl', ['$scope', '$stateParams', 'PrayersService', function($scope, $stateParams, PrayersService) {
  $scope.prayers = PrayersService
}])

controllers.controller('PrayerCtrl', ['$scope', '$stateParams', 'PrayersService', function($scope, $stateParams, PrayersService) {
  $scope.prayer = PrayersService.filter(function(a) { return a.id == $stateParams.prayerId })[0]
  author = $scope.prayer.author.toLowerCase() || ''
  $scope.getAuthorFirstLetter = function () {
    if(author.search("báb")>=0 || author.search("bahá'u'lláh")>=0){
      return 'b'
    } else {
      return 'a'
    }
  }
}])

