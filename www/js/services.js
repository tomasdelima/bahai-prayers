var services = angular.module('services', [])

services.service('CategoriesService', function($http, DBService) {
  var self = this
  self.categories = []

  return {
    load: function(categoryId) {
      return DBService.select('categories_table', self.categories, categoryId)
    },
    categories: self.categories || [],
    loadFromRemoteServer: function(url) {
      var existingIds = []
      DBService.execute('select id from categories_table', function(results) {
        for (var i=0; i<results.rows.length; i++) {
          existingIds.push(results.rows.item(i).id)
        }

        DBService.loadFromRemoteServer(url+'/categories', self.categories, 'lastUpdatedCategoriesAt', function(data){
          data.forEach(function(d){
            if(existingIds.indexOf(Number(d.id)) == -1) {
              DBService.insert('categories_table', ['id', 'title'], [d.id, d.title])
              self.categories.push(d)
            } else {
              DBService.update('categories_table', ['title'], [d.title], d.id)
            }
          })
        })
      })
    }
  }
})

services.service('PrayersService', function($http, DBService) {
  var self = this
  self.prayers = []

  return {
    load: function(prayerId) {
      return DBService.select('prayers_table', self.prayers, prayerId)
    },
    prayers: self.prayers || [],
    loadFromRemoteServer: function(url) {
      var existingIds = []
      DBService.execute('select id from prayers_table', function(results) {
        for (var i=0; i<results.rows.length; i++) {
          existingIds.push(results.rows.item(i).id)
        }

        DBService.loadFromRemoteServer(url+'/prayers', self.categories, 'lastUpdatedPrayersAt', function(data){
          data.forEach(function(d){
            if(existingIds.indexOf(Number(d.id)) == -1) {
              DBService.insert('prayers_table', ['id', 'body', 'author', 'categoryId'], [d.id, d.body, d.author, d.category_id])
              self.prayers.push(d)
            } else {
              DBService.update('prayers_table', ['body', 'author', 'categoryId'], [d.body, d.author, d.category_id], d.id)
            }
          })
        })
      })
    },
    letterCount: function (str) {
      return str.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").split(" ").length
    }
  }
})

services.service('DBService', function($http){
  return {
    load: function() {
      console.log('Preparing DB')
      angular.db = openDatabase('bahai-prayers', '1.0', 'bahai-prayers-db', 2 * 1024 * 1024)
      angular.db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS prayers_table (id integer primary key, categoryId integer, body text, author text)')
        tx.executeSql('CREATE TABLE IF NOT EXISTS categories_table (id integer primary key, title text)')
      })
    },
    loadFromRemoteServer: function(url, collection, lastUpdatedVariable, callBack) {
      var self = this,
          errors = 0,
          sufix = localStorage[lastUpdatedVariable] ? '?last_updated_at=' + localStorage[lastUpdatedVariable] : ''

      console.log('Fetching data from: ' + url + sufix)
      $http.get( url + sufix)
        .success(function(data){callBack(data)})
        .error(function(){errors+=1})

      if(!errors) { localStorage[lastUpdatedVariable] = Date.now() }
    },
    select: function(table, collection, id){
      var sqlString = 'select * from ' + table + (id ? ' where id = "' + id + '"' : '')
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
    update: function(table, fields, values, id) {
      var sqlString = 'update ' + table + ' set '
      fields.forEach(function(field, index){
        sqlString += field + ' = "' + values[index] + '"' + (index + 1 == fields.length ? ' ' : ', ')
      })
      sqlString += 'where id = "' + id + '"'
      this.execute(sqlString)
    },
    delete: function(table, ids) {
      var sqlString = 'delete from ' + table + (ids ? ' where id in (' + ids + ')' : '')
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
