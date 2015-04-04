controllers = angular.module('controllers', [])
remoteHost = 'http://bahai-prayers-server.herokuapp.com'
// remoteHost = 'http://localhost:3000'

controllers.controller('AppCtrl', ['$scope', '$timeout', '$window', 'PrayersService', 'DBService', function($scope, $timeout, $window, PrayersService, DBService) {
  $scope.loading = true
  DBService.load(function(){
    PrayersService.load(function(){
      PrayersService.loadSinglePrayerIds(function(){
        if(PrayersService.prayers.length > 0 && PrayersService.categories.length > 0) { $scope.loading = false }
        PrayersService.loadCategoriesFromRemoteServer(remoteHost, function(){
          PrayersService.loadPrayersFromRemoteServer(remoteHost, function(){
            $scope.loading = false
          })
        })
      })
    })
  })

  $scope.dots = ''
  $scope.fontFamily = localStorage.fontFamily
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
}])

controllers.controller('CategoriesCtrl', ['$scope', '$stateParams', 'PrayersService', function($scope, $stateParams, PrayersService) {
  $scope.categories = PrayersService.categories
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
}])

controllers.controller('PrayersCtrl', ['$scope', '$stateParams', 'PrayersService', function($scope, $stateParams, PrayersService) {
  $scope.prayers = PrayersService.prayers.filter(function(prayer){
    return prayer.id == $stateParams.prayerId
  })
  $scope.changeFontSize = function changeFontSize(n) {
    if (isNaN(localStorage.fontSize)) { localStorage.fontSize = 10 }
    $scope.fontSize = Number(localStorage.fontSize)
    if ($scope.fontSize + n <= 40 && $scope.fontSize + n >= 10) { $scope.fontSize += n }
    localStorage.fontSize = $scope.fontSize
  }
  $scope.letterCount = PrayersService.letterCount
  $scope.deHtmlize = PrayersService.deHtmlize
  $scope.fontSize = localStorage.fontSize || 10
  $scope.sharePrayer = function() {
    window.plugins.socialsharing.share('"' + $scope.deHtmlize($scope.prayers[0].body, '\n') + '"\n— ' + $scope.prayers[0].author)
  }
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

