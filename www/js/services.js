var services = angular.module('services', []),
    host = 'http://bahai-prayers-server.herokuapp.com'

services.service('PrayersService', function($http) {
  var self = this
  self.prayers = []

  return {
    load: function(prayerId) {
      var sqlString = 'select * from prayers_table' + (prayerId ? ' where id = "' + prayerId + '"' : '')
      console.log('Executing query: '+sqlString)

      angular.db.transaction(function(tx) {
        tx.executeSql(sqlString, [],
          function(tx, results) {
            for (var i=0; i<results.rows.length; i++) {
              self.prayers.push(results.rows.item(i))
            }
            console.log('Query executed successfully')
          },
          function(tx, error) {
            console.log(tx, error)
          }
        )
      })
      return self.prayers
    },
    prayers: self.prayers
  }
})

services.service('CategoriesService', function($http) {
  var self = this
  self.categories = []

  return {
    load: function(categoryId){
      var sqlString = 'select * from categories_table' + (categoryId ? " where id = '" + categoryId + "'" : '')
      console.log('Executing query: '+sqlString)

      angular.db.transaction(function(tx) {
        tx.executeSql(sqlString,[],
          function(tx, results) {
            for (var i=0; i<results.rows.length; i++) {
              self.categories.push(results.rows.item(i))
            }
            console.log('Query executed successfully')
          },
          function(tx, error) {
            console.log(tx, error)
          }
        )
      })
      return self.categories
    },
    categories: self.categories
  }
})
