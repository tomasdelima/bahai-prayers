controllers = angular.module('controllers', [])
remoteHost = 'http://bahai-prayers-server.herokuapp.com'
// remoteHost = 'http://localhost:3000'

controllers.controller('AppCtrl', function($scope, $stateParams, DBService, PrayersService, CategoriesService) {
  DBService.load()

  CategoriesService.load()
  PrayersService.load()

  var daysSinceLastUpdate = ((new Date).getTime() - Number(localStorage.lastUpdatedCategoriesAt))/(1000*60*60*24)
  if (navigator.onLine &&  daysSinceLastUpdate > 0) {
    CategoriesService.loadFromRemoteServer(remoteHost)
    PrayersService.loadFromRemoteServer(remoteHost)
  }

  $scope.changeFontSize = changeFontSize
  $scope.fontSize = localStorage.fontSize || 10
  $scope.fontFamily = localStorage.fontFamily
  $scope.currentView = currentView
})

controllers.controller('CategoriesCtrl', function($scope, $stateParams, CategoriesService) {
  $scope.categories = CategoriesService.categories
  $scope.currentView = currentView
})

controllers.controller('CategoryCtrl', ['$scope', '$stateParams', 'PrayersService', 'CategoriesService', 'DBService', function($scope, $stateParams, PrayersService, CategoriesService, DBService) {
  DBService.execute('select * from prayers_table where categoryId = "' + $stateParams.categoryId + '"', function(results) {
    $scope.prayers = []
    for(i=0; i<results.rows.length; i++) {
      $scope.prayers.push(results.rows.item(i))
    }
    $scope.deHtmlize = deHtmlize
  })
  DBService.select('categories_table', $scope.categories = [], $stateParams.categoryId)
  $scope.letterCount = letterCount
  $scope.currentView = currentView
}])

controllers.controller('PrayersCtrl', ['$scope', '$stateParams', 'DBService', function($scope, $stateParams, DBService) {
  DBService.select('prayers_table', $scope.prayers = [], $stateParams.prayerId)
  $scope.letterCount = letterCount
  $scope.deHtmlize = deHtmlize
  $scope.currentView = currentView
  $scope.presentPrayer = function(prayerBody) {
    if (prayerBody) {
      var accent = '<span class="accent">&acute</span>'
      var firstLetter = prayerBody[0].replace('Ó', 'O' + accent).replace('É', 'E' + accent)
      return firstLetter + prayerBody.slice(1)
    }
  }
}])

controllers.controller('AllahuabhasCtrl', function($scope) {
  $scope.counter = 0
  $scope.tap = function() {
    $scope.counter += 1
    var vibrationIntensity = Number(localStorage.vibrationIntensity)
    if ($scope.counter >= 95) {
      $scope.cssClass = 'done'
      navigator.notification.vibrate(vibrationIntensity * 5)
    } else {
      navigator.notification.vibrate(vibrationIntensity)
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
  $scope.currentView = currentView
})

controllers.controller('ConfigCtrl', ["$scope", function($scope) {
  $scope.fontFamilies = [
    'Alegreya',
    'Artifika',
    'Cardo',
    'Timeless',
  ]
  $scope.fontFamily = localStorage.fontFamily || 'Cardo'
  $scope.setFontFamily = function(newFontFamily) {localStorage.fontFamily = newFontFamily}
  $scope.vibrationIntensity = Number(localStorage.vibrationIntensity)
  $scope.setVibration = function(increase) {
    $scope.vibrationIntensity = Number(localStorage.vibrationIntensity) + increase
    if($scope.vibrationIntensity < 0) { $scope.vibrationIntensity = 0 }
    localStorage.vibrationIntensity = $scope.vibrationIntensity
    navigator.notification.vibrate($scope.vibrationIntensity)
  }
}])

function letterCount(str) { return str.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").split(" ").length }
function deHtmlize(str) { return str.replace(/<br>/g, ' ') }
function currentView() { return (location.hash.indexOf('/prayers/') > 0) ? 'prayer-view' : ''}
function changeFontSize(n, scope) {
  if (isNaN(localStorage.fontSize)) { localStorage.fontSize = 10 }
  scope.fontSize = Number(localStorage.fontSize)
  if (scope.fontSize + n <= 40 && scope.fontSize + n >= 10) { scope.fontSize += n }
  localStorage.fontSize = scope.fontSize
}
