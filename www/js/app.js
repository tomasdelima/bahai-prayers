angular.module('prayer', ['ionic', 'controllers', 'services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
    }
    if (window.StatusBar) {
      StatusBar.styleDefault()
    }

    angular.db = openDatabase('bahai-prayers', '1.0', 'bahai-prayers-db', 2 * 1024 * 1024),
    angular.db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS prayers_table (id integer primary key, categoryId integer, body text, author text)');
    })
    // console.log(angular)
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
