var controllers = angular.module('controllers', []),
    remoteHost = 'http://bahai-prayers-server.herokuapp.com'

controllers.controller('AppCtrl', function($scope, $http, DBService, PrayersService, CategoriesService) {
  DBService.load()

  CategoriesService.load()
  PrayersService.load()

  var daysSinceLastUpdate = ((new Date).getTime() - Number(localStorage.lastUpdatedCategoriesAt))/(1000*60*60*24)
  if(navigator.onLine &&  daysSinceLastUpdate > 7) {
    CategoriesService.loadFromRemoteServer(remoteHost)
    PrayersService.loadFromRemoteServer(remoteHost)
  }
})

controllers.controller('CategoriesCtrl', function($scope, $stateParams, CategoriesService) {
  $scope.categories = CategoriesService.categories
})

controllers.controller('CategoryCtrl', ['$scope', '$stateParams', 'PrayersService', 'CategoriesService', function($scope, $stateParams, PrayersService, CategoriesService) {
  preambles = {}
  $scope.prayers = PrayersService.prayers
    .filter(function(a){return a.categoryId == $stateParams.categoryId})
  $scope.category = CategoriesService.categories
    .filter(function(a){return a.id == $stateParams.categoryId})[0]
  $scope.letterCount = letterCount
  $scope.deHtmlize = deHtmlize
}])

controllers.controller('PrayersCtrl', ['$scope', '$stateParams', 'DBService', function($scope, $stateParams, DBService) {
  DBService.select('prayers_table', $scope.prayers = [], $stateParams.prayerId)
  $scope.letterCount = letterCount
  $scope.deHtmlize = deHtmlize
}])

controllers.controller('AllahuabhasCtrl', function($scope) {
  $scope.counter = 0
  $scope.tap = function() {
    $scope.counter += 1
    if( $scope.counter >= 95 ) {
      $scope.cssClass = 'done'
      navigator.notification.vibrate(60)
    } else {
      navigator.notification.vibrate(11)
    }
  }
  $scope.restart = function(){
    $scope.counter = 0
    $scope.cssClass = ''
  }
})

controllers.controller('SearchCtrl', function($scope, PrayersService){
  $scope.prayers = PrayersService.prayers
  $scope.letterCount = letterCount
  $scope.deHtmlize = deHtmlize
})

controllers.controller('ConfigCtrl', function($scope) {
  if(!localStorage.fontSize) {
    localStorage.fontSize = 20
  }
  $scope.fontSize = localStorage.fontSize
  $scope.changeFontSize = function(n) {
    $scope.fontSize = Number(localStorage.fontSize) + n
    localStorage.fontSize = $scope.fontSize
  }
})

function letterCount(str) { return str.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").split(" ").length }
function deHtmlize(string) { return string.replace(/<br>/g, ' ') }
