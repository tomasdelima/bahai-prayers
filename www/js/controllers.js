controllers = angular.module('controllers', [])
remoteHost = 'http://bahai-prayers-server.herokuapp.com'
// remoteHost = 'http://localhost:3000'

controllers.controller('AppCtrl', ['$scope', '$timeout', '$window', 'PrayersService', 'DBService', function($scope, $timeout, $window, PrayersService, DBService) {
  $scope.loading = true
  DBService.load(function(){
    PrayersService.load(function(){
      PrayersService.loadSinglePrayerIds(function(){
        PrayersService.loadCategoriesFromRemoteServer(remoteHost, function(){
          $scope.loading = false
          PrayersService.loadPrayersFromRemoteServer(remoteHost, function(){
          })
        })
      })
    })
  })

  $scope.dots = ''
  $scope.startDots = function(){
    $timeout(function(){
      if($scope.dots.length > 2) {
        $scope.dots = ''
      } else {
        $scope.dots += '.'
      }
      $scope.startDots()
    }, 1000)
  }
  $scope.changeFontSize = changeFontSize
  $scope.fontSize = localStorage.fontSize || 10
  $scope.fontFamily = localStorage.fontFamily
  $scope.currentView = currentView
}])


controllers.controller('CategoriesCtrl', ['$scope', '$stateParams', 'PrayersService', function($scope, $stateParams, PrayersService) {
  $scope.categories = PrayersService.categories
  $scope.currentView = currentView
  $scope.singlePrayerIds = PrayersService.singlePrayerIds
  $scope.hrefFor = function(categoryId) {
    if($scope.singlePrayerIds[categoryId] > 0) {
      return '#/app/prayers/' + $scope.singlePrayerIds[categoryId]
    } else {
      return '#/app/categories/' + categoryId
    }
  }
}])

controllers.controller('CategoryCtrl', ['$scope', '$stateParams', 'PrayersService', function($scope, $stateParams, PrayersService) {
  $scope.deHtmlize = PrayersService.deHtmlize
  $scope.categories = PrayersService.categories.filter(function(category){
    return category.id == $stateParams.categoryId
  })
  $scope.prayers = PrayersService.prayers.filter(function(prayer){
    return prayer.categoryId == $stateParams.categoryId
  })
  $scope.letterCount = PrayersService.letterCount
  $scope.currentView = currentView
}])

controllers.controller('PrayersCtrl', ['$scope', '$stateParams', 'PrayersService', function($scope, $stateParams, PrayersService) {
  $scope.prayers = PrayersService.prayers.filter(function(prayer){
    return prayer.id == $stateParams.prayerId
  })
  $scope.letterCount = PrayersService.letterCount
  $scope.deHtmlize = PrayersService.deHtmlize
  $scope.currentView = currentView
  $scope.presentPrayer = function(prayerBody) {
    if (prayerBody) {
      var accent = '<span class="accent">&acute</span>'
      var firstLetter = prayerBody[0].replace('Ó', 'O' + accent).replace('É', 'E' + accent)
      return firstLetter + prayerBody.slice(1)
    }
  }
}])

controllers.controller('AllahuabhasCtrl', ['$scope', function($scope) {
  $scope.counter = 0
  $scope.tap = function() {
    $scope.counter += 1
    var vibrationIntensity = Number(localStorage.vibrationIntensity)
    if ($scope.counter >= 95) {
      $scope.cssClass = 'done'
      navigator.notification.vibrate(vibrationIntensity * 10)
    } else {
      navigator.notification.vibrate(vibrationIntensity)
    }
  }
  $scope.restart = function(){
    $scope.counter = 0
    $scope.cssClass = ''
  }
}])

controllers.controller('SearchCtrl', function($scope, PrayersService){
  $scope.prayers = PrayersService.prayers
  $scope.letterCount = PrayersService.letterCount
  $scope.deHtmlize = PrayersService.deHtmlize
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

function currentView() { return (location.hash.indexOf('/prayers/') > 0) ? 'prayer-view' : ''}
function changeFontSize(n, scope) {
  if (isNaN(localStorage.fontSize)) { localStorage.fontSize = 10 }
  scope.fontSize = Number(localStorage.fontSize)
  if (scope.fontSize + n <= 40 && scope.fontSize + n >= 10) { scope.fontSize += n }
  localStorage.fontSize = scope.fontSize
}
