var services = angular.module('services', [])

services.service('PrayersService', function($http){
  var self = this
  return {
    load: function(categoryId){
      return $http.get('http://bahai-prayers-server.herokuapp.com/categories/'+categoryId+'/prayers').success(function(data) {
        self.categories = data
      })
    }
  }
})

services.service('CategoriesService', function($http){
  var self = this
  return {
    load: function(){
      return $http.get('http://bahai-prayers-server.herokuapp.com/categories').success(function(data) {
        self.categories = data
      })
    }
  }
})
