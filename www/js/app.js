angular.module('prayer', ['ionic', 'controllers', 'services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
    }
    if (window.StatusBar) {
      StatusBar.styleDefault()
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
        templateUrl: "templates/category.html",
        controller: 'CategoryCtrl'
      }
    }
  })

  .state('app.prayer', {
    url: "/categories/:categoryId/prayers/:prayerId",
    views: {
      'menuContent': {
        templateUrl: "templates/prayer.html",
        controller: 'PrayerCtrl'
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

  $urlRouterProvider.otherwise('/app/categories')
})
