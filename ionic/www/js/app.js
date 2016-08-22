angular.module('prayer', ['ionic', 'controllers', 'services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
    }
    if (window.StatusBar) {
      StatusBar.styleDefault()
    }
    if(!localStorage.configured) {
      localStorage.fontFamily = 'Cardo'
      localStorage.fontSize = '20'
      localStorage.vibrationIntensity = '10'
      localStorage.configured = true
    }
  })
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.categories', {
    url: "/categories",
    views: {
      'menuContent': {
        templateUrl: "templates/categories.html",
        controller: 'CategoriesCtrl'
      }
    }
  })

  .state('app.category', {
    url: "/categories/:categoryId",
    views: {
      'menuContent': {
        templateUrl: "templates/prayers.html",
        controller: 'CategoryCtrl'
      }
    }
  })

  .state('app.prayers', {
    url: "/prayers",
    views: {
      'menuContent': {
        templateUrl: "templates/prayers.html",
        controller: 'PrayersCtrl'
      }
    }
  })

  .state('app.favorites', {
    url: "/favorites/:filterFavorites",
    views: {
      'menuContent': {
        templateUrl: "templates/prayers.html",
        controller: 'FavoritesCtrl'
      }
    }
  })

  .state('app.prayer', {
    url: "/prayers/:prayerId",
    views: {
      'menuContent': {
        templateUrl: "templates/prayer.html",
        controller: 'PrayersCtrl'
      }
    }
  })

  .state('app.configurations', {
    url: "/configurations",
    views: {
      'menuContent': {
        templateUrl: "templates/configurations.html",
        controller: 'ConfigCtrl'
      }
    }
  })

  .state('app.95allahuabhas', {
    url: "/95allahuabhas",
    views: {
      'menuContent': {
        templateUrl: "templates/95allahuabhas.html",
        controller: 'AllahuabhasCtrl'
      }
    }
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html",
        controller: 'SearchCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/app/categories')
})
