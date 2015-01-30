var services = angular.module('services', []),
    host = 'http://bahai-prayers-server.herokuapp.com'

services.service('CategoriesService', function($http, DBService) {
  var self = this
  self.categories = []

  return {
    load: function(categoryId) {
      return DBService.select('categories_table', self.categories, categoryId)
    },
    categories: self.categories
  }
})

services.service('PrayersService', function($http, DBService) {
  var self = this
  self.prayers = []

  return {
    load: function(prayerId) {
      return DBService.select('prayers_table', self.prayers, prayerId)
    },
    prayers: self.prayers
  }
})

services.service('DBService', function(){
  return {
    load: function() {
      console.log('Preparing DB')
      angular.db = openDatabase('bahai-prayers', '1.0', 'bahai-prayers-db', 2 * 1024 * 1024)
      angular.db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS prayers_table (id integer primary key, categoryId integer, body text, author text)')
        tx.executeSql('CREATE TABLE IF NOT EXISTS categories_table (id integer primary key, title text)')
      })
    },
    select: function(table, collection, id){
      var sqlString = 'select * from ' + table + (id ? " where id = '" + id + "'" : '')
      this.execute(sqlString, function(results) {
        for (var i=0; i<results.rows.length; i++) {
          collection.push(results.rows.item(i))
        }
      })
      return collection
    },
    insert: function(table, fields, values) {
      var sqlString = 'insert into ' + table + ' (' + fields.join(',') + ') values ("' + values.join('","') + '")'
      this.execute(sqlString)
    },
    clean: function(table) {
      var sqlString = 'delete from ' + table
      this.execute(sqlString)
    },
    execute: function(sqlString, callBack) {
      console.log('Executing query: ' + sqlString)

      angular.db.transaction(function(tx) {
        tx.executeSql(sqlString,[],
          function(tx, results) {
            console.log('Query executed successfully: ' + sqlString)
            if(callBack){callBack(results)}
          },
          function(tx, error) {
            console.log(tx, error)
          }
        )
      })
    }
  }
})
