services = angular.module('services', [])
versionDate = Number(new Date(2015, 3-1, 8))
localVersionDate = localStorage.lastUpdatedDBSchemaAt || 0
globalVerbose = 3 // verbose levels: (1) no logging, (2) medium logging and (3) full logging

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
      DBService.loadFromRemoteServer(url+'/categories', self.categories, 'lastUpdatedCategoriesAt', function(data){
        DBService.execute('select id from categories_table', function(results) {
          for (var i=0; i<results.rows.length; i++) {
            existingIds.push(results.rows.item(i).id)
          }

          data.forEach(function(d){
            if (existingIds.indexOf(Number(d.id)) == -1) {
              DBService.insert('categories_table', [ 'id', 'title', 'active'],
                                                   [d.id, d.title, d.active ])
              self.categories.push(d)
            } else {
              DBService.update('categories_table', [ 'title', 'active'],
                                                   [d.title, d.active ], d.id)
            }
          }, 2)
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
      DBService.loadFromRemoteServer(url+'/prayers', self.categories, 'lastUpdatedPrayersAt', function(data){
        DBService.execute('select id from prayers_table', function(results) {
          for (var i=0; i<results.rows.length; i++) {
            existingIds.push(results.rows.item(i).id)
          }

          data.forEach(function(d){
            if (existingIds.indexOf(Number(d.id)) == -1) {
              DBService.insert('prayers_table', [ 'id', 'preamble', 'body', 'author', 'categoryId',  'active'],
                                                [d.id, d.preamble, d.body, d.author, d.category_id, d.active])
              self.prayers.push(d)
            } else {
              DBService.update('prayers_table', [ 'preamble', 'body', 'author', 'categoryId', 'active' ],
                                                [d.preamble, d.body, d.author, d.category_id, d.active], d.id)
            }
          }, 2)
        })
      })
    },
    loadConfig: function (attr) {
      return localStorage[attr]
    }
  }
})

services.service('DBService', function($http, $state) {
  return {
    load: function() {
      db = this
      log('\n>> Preparing DB')
      angular.db = openDatabase('bahai-prayers', '1.0', 'bahai-prayers-db', 2 * 1024 * 1024)
      db.execute('CREATE TABLE IF NOT EXISTS prayers_table ( id integer primary key, categoryId integer, body text, author text, preamble text, favorite boolean, active boolean )', undefined, 1)
      db.execute('CREATE TABLE IF NOT EXISTS categories_table ( id integer primary key, title text, active boolean )', undefined, 1)
      if (localVersionDate < versionDate) {
        db.recreateDB($state.reload)
      }
    },
    loadFromRemoteServer: function(url, collection, lastUpdatedVariable, callBack) {
      var self = this,
          errors = 0,
          sufix =  '.json' + (localStorage[lastUpdatedVariable] ? '?last_updated_at=' + localStorage[lastUpdatedVariable] : '')

      log('Fetching data from: ' + url + sufix)
      $http.get( url + sufix)
        .success(function(data){
          callBack(data)
          log('Fetched data from: ' + url + sufix)
        })
        .error(function(error){
          db.postError({message: 'Error fetching data: ' + error})
          log('\n!!! Error fetching data: ' + error)
          errors += 1
        })

      if (!errors) { localStorage[lastUpdatedVariable] = Date.now() }
    },
    postError: function(data) {
      var query = 'message=' + data.message
      // if(window.device) { query += '[origin=' + device.name + '-' + device.model + ']'}
      $http.get( remoteHost + '/mobile_errors?' + query )
      .success(function(data){
        log('Error logged')
      })
      .error(function(error){
        log('Error logging error')
      })
    },
    select: function(table, collection, id){
      var sqlString = 'select * from ' + table + ' where active="true" ' + (id?'and id="'+id+'"':'')
      this.execute(sqlString, function(results) {
        for (var i=0; i<results.rows.length; i++) {
          collection.push(results.rows.item(i))
        }
      })
      return collection
    },
    insert: function(table, fields, values, verbose) {
      var sqlString = 'insert into ' + table + ' (' + fields.join(',') + ') values ("' + values.join('","') + '")'
      this.execute(sqlString, undefined, verbose)
    },
    update: function(table, fields, values, id, verbose) {
      var sqlString = 'update ' + table + ' set '
      fields.forEach(function(field, index){
        sqlString += field + ' = "' + values[index] + '"' + (index + 1 == fields.length ? ' ' : ', ')
      })
      sqlString += 'where id = "' + id + '"'
      this.execute(sqlString, undefined, verbose)
    },
    delete: function(table, ids, verbose) {
      var sqlString = 'delete from ' + table + (ids ? ' where id in (' + ids + ')' : '')
      this.execute(sqlString, undefined, verbose)
    },
    execute: function(sqlString, callBack, verbose) {
      verbose = verbose || globalVerbose
      if(verbose > 1) {
        log('Executing query' + (verbose > 2 ? ': ' + sqlString : ''))
      }

      angular.db.transaction(function(tx) {
        tx.executeSql(sqlString,[],
          function(tx, results) {
            var lines = (results.rowsAffected ? results.rowsAffected + ' affected' : results.rows.length) + ' lines'
            if(verbose > 1) {
              log('Query executed successfully (' + lines + ')' + (verbose > 2 ? ': ' + sqlString : ''))
            }
            if (callBack){callBack(results)}
          },
          function(tx, error) {
            db.postError({message: 'Error fetching data: ' + error.message})
            log('\n!!! Error executing query: ' + error.message)
          }
        )
      })
    },
    executeAndLog: function(sqlString) {
      db.execute(sqlString, function(r){for(i=0;i<r.rows.length;i++){log(r.rows.item(i))}})
    },
    resetDB: function(){
      this.delete('categories_table')
      this.delete('prayers_table')
      localStorage.lastUpdatedCategoriesAt = 0
      localStorage.lastUpdatedPrayersAt = 0
    },
    recreateDB: function(callback) {
      log('\n>>>> Recreating DB')
      db.execute('DROP TABLE prayers_table', function(){
        db.execute('CREATE TABLE prayers_table ( id integer primary key, categoryId integer, body text, author text, preamble text, favorite boolean, active boolean )', function() {
          db.execute('DROP TABLE categories_table', function(){
            db.execute('CREATE TABLE categories_table ( id integer primary key, title text, active boolean )', function() {
              log('\n>>>> DB recreated successfully')
              callback()
            })
          })
        })
      })

      localStorage.lastUpdatedCategoriesAt = 0
      localStorage.lastUpdatedPrayersAt = 0
      localStorage.lastUpdatedDBSchemaAt = Date.now()
    }
  }
})

log = function() { return console.log.apply(console, arguments) }
