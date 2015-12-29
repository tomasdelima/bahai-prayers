controllers = angular.module('controllers', [])
remoteHost = 'http://bahai-prayers-server.herokuapp.com'
// remoteHost = 'http://localhost:3000'

controllers.controller('AppCtrl', ['$scope', '$timeout', '$window', 'PrayersService', 'DBService', function($scope, $timeout, $window, PrayersService, DBService) {
  var body = angular.element(document.getElementsByTagName("body"))
  $scope.loading = true
  $scope.dots = ''
  $scope.theme = localStorage.theme

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
  }, false)

  if(!localStorage.theme) { localStorage.theme = 'day' }
  body.addClass($scope.theme)
  $scope.changeTheme = function() {
    if($scope.theme == 'night') {
      localStorage.theme = $scope.theme = 'day'
      body.addClass('day')
      body.removeClass('night')
    } else {
      localStorage.theme = $scope.theme = 'night'
      body.addClass('night')
      body.removeClass('day')
    }
  }
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

controllers.controller('PrayersCtrl', ['$scope', '$stateParams', 'PrayersService', 'DBService', function($scope, $stateParams, PrayersService, DBService) {
  $scope.prayers = PrayersService.prayers.filter(function(prayer){
    return prayer.id == $stateParams.prayerId
  })
  $scope.changeFontSize = function changeFontSize(n) {
    if (isNaN(localStorage.fontSize)) { localStorage.fontSize = 10 }
    $scope.fontSize = Number(localStorage.fontSize)
    if ($scope.fontSize + n <= 40 && $scope.fontSize + n >= 10) { $scope.fontSize += n }
    localStorage.fontSize = $scope.fontSize
  }
  $scope.filterFavorites = $stateParams
  $scope.showWatermark = Number(localStorage.waterMarkVisibility)
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
  $scope.toggleFavorite = function() {
    prayer = $scope.prayers[0]
    prayer.favorite = !prayer.favorite
    DBService.update('prayers_table', ['favorite'], [prayer.favorite], prayer.id)
  }
}])

controllers.controller('FavoritesCtrl', ['$scope', '$controller', '$stateParams', 'PrayersService', 'DBService', function($scope, $controller, $stateParams, PrayersService, DBService) {
  $controller('PrayersCtrl', {$scope: $scope})
  $scope.prayers = PrayersService.prayers
}])

controllers.controller('AllahuabhasCtrl', ['$scope', function($scope) {
  $scope.counter = 0

  $scope.tap = function() {
    if ($scope.counter == 95 - 1) {
      vibrate(10)
      $scope.cssClass = 'done'
      $scope.counter += 1
    } else if ($scope.counter < 95) {
      vibrate(1)
      $scope.counter += 1
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
  if(!localStorage.waterMarkVisibility) { localStorage.waterMarkVisibility = 1 }
  if(!localStorage.vibrationIntensity) { localStorage.vibrationIntensity = 5 }

  $scope.vibrationIntensity = Number(localStorage.vibrationIntensity) || 5
  $scope.setVibration = function(increase) {
    $scope.vibrationIntensity += increase
    if($scope.vibrationIntensity < 1) { $scope.vibrationIntensity = 1 }
    localStorage.vibrationIntensity = $scope.vibrationIntensity
    vibrate(1)
  }
  $scope.waterMarkVisibility = Number(localStorage.waterMarkVisibility)
  $scope.saveWaterMarkVisibility = function () {
    localStorage.waterMarkVisibility = $scope.waterMarkVisibility = 1 - $scope.waterMarkVisibility
  }
}])
