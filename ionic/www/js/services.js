services = angular.module('services', [])
globalVerbose = 2 // verbose levels: (1) no logging, (2) medium logging and (3) full logging

services.service('PrayersService', function($http, DBService) {
  var self = this
  self.prayers = []
  self.categories = []
  self.singlePrayerIds = {}

  return {
    load: function(callBack){
      DBService.select('prayers_table', self.prayers, undefined, function(){
        DBService.select('categories_table', self.categories, undefined, callBack, 1)
      }, 1)
    },
    prayers: self.prayers,
    categories: self.categories,
    singlePrayerIds: self.singlePrayerIds,
    loadPrayersFromRemoteServer: function(url, callBack) {
      var existingIds = []
      DBService.loadFromRemoteServer(url+'/prayers', self.prayers, 'lastUpdatedPrayersAt', function(data){
        DBService.execute('select id from prayers_table', function(results) {
          for (var i=0; i<results.rows.length; i++) {
            existingIds.push(results.rows.item(i).id)
          }
          DBService.insertOrUpdateCollection('prayers_table', ['id', 'preamble', 'body', 'author', 'categoryId', 'active'], data, existingIds, self.prayers, 1)
          if(callBack){callBack()}
        }, 1)
      })
    },
    loadCategoriesFromRemoteServer: function(url, callBack) {
      var existingIds = []
      DBService.loadFromRemoteServer(url+'/categories', self.categories, 'lastUpdatedCategoriesAt', function(data){
        DBService.execute('select id from categories_table', function(results) {
          for (var i=0; i<results.rows.length; i++) {
            existingIds.push(results.rows.item(i).id)
          }
          DBService.insertOrUpdateCollection('categories_table', [ 'id', 'title', 'active'], data, existingIds, self.categories, 1)
          if(callBack){callBack()}
        }, 1)
      })
    },
    loadSinglePrayerIds: function(callBack){
      DBService.execute('select a.id as categoryId, count(b.id) as prayersCount, b.id as prayerId from categories_table a join prayers_table b on a.id = b.categoryId where b.active = "true" group by a.id', function(results) {
        for (var i=0; i<results.rows.length; i++) {
          var item = results.rows.item(i)
          if(item.prayersCount == 1) {
            self.singlePrayerIds[item.categoryId] = item.prayerId
          }
        }
        if(callBack){callBack()}
      }, 1)
    },
    loadConfig: function(attr) {
      return localStorage[attr]
    },
    deHtmlize: function(str, newline) { return str.replace(/<br>/g, newline || ' ') },
    letterCount: function(str) { return str.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").split(" ").length },
  }
})

services.service('DBService', function($http, $state) {
  return {
    load: function(callBack, recreateDB) {
      db = this
      log('\n>> Preparing DB')
      angular.db = openDatabase('bahai-prayers', '1.0', 'bahai-prayers-db', 2 * 1024 * 1024)
      if(recreateDB) {
        db.recreateDB(function(){
          db.prepareDB(callBack)
        })
      } else {
        db.prepareDB(callBack)
      }
    },
    prepareDB: function(callBack){
      db.prepareSchema('categories_table', {title: 'text', active: 'boolean'}, {}, function(){
        db.prepareSchema('prayers_table', {categoryId: 'integer', body: 'text', author: 'text', preamble: 'text', favorite: 'boolean', active: 'boolean'}, {favorite: false}, function(){
          log('>> DB Prepared')
          if(callBack){callBack()}
        })
      })
    },
    prepareSchema: function(table, fieldsObj, defaultValues, callBack){
      log('>>>> Preparing schema for ' + table)
      db.createRawTable(table, function(){
        db.addColumns(table, fieldsObj, defaultValues, function(){
          log('>>>> Schema loaded for ' + table)
          if(callBack){callBack()}
        })
      }, 1)
    },
    createRawTable: function(table, callBack){
      db.execute('CREATE TABLE IF NOT EXISTS ' + table + ' ( id integer primary key )', function(results){
        db.execute('select * from ' + table + ' limit 1', function(results) {
          if(results.rows.length == 0){
            db.insert(table, ['id'], [0], function(){
              log('>>>>>> Table "' + table + '" created successfully')
              if(callBack){callBack()}
            }, 1)
          } else {
            if(callBack){callBack()}
          }
        }, 1)
      }, 1)
    },
    addColumns: function(table, fieldsObj, defaultValues, callBack){
      db.execute('select * from ' + table + ' limit 1', function(results) {
        var newColumns = [],
            sqlStrings = []

        for(var f in fieldsObj) {
          if(results.rows.length && !results.rows.item(0).hasOwnProperty(f)){
            newColumns.push(f)
            defaultValue = defaultValues[f] || '""'
            sqlStrings.push('ALTER TABLE ' + table + ' ADD COLUMN ' + f + ' ' + fieldsObj[f] + ' DEFAULT ' + defaultValue)
          }
        }
        db.executeTransaction(sqlStrings, undefined, function(){
          if(newColumns.length > 0) {
            log('>>>>>> Columns created successfully: ' + newColumns.join(', ') + ' (' + table + ')')
          }
          if(callBack){callBack()}
        }, 1)
      }, 1)
    },
    loadFromRemoteServer: function(url, collection, lastUpdatedVariable, callBack) {
      var self = this,
          errors = 0,
          sufix =  '.json' + (localStorage[lastUpdatedVariable] ? '?last_updated_at=' + localStorage[lastUpdatedVariable] : '')

      log('\n>> Fetching data from: ' + url + sufix)
      $http.get( url + sufix)
        .success(function(data){
          callBack(data)
          log('>> Fetched data from: ' + url + sufix)
        })
        .error(function(error){
          db.postError({message: 'Error fetching data: ' + error})
          console.error('\n!!! Error fetching data: ' + error)
          errors += 1
        })

      if (!errors) { localStorage[lastUpdatedVariable] = Date.now() }
    },
    postError: function(data) {
      var query = 'message=' + data.message
      if(window.device) { query += ' [origin=' + device.name + '-' + device.model + ']'}
      $http.get( remoteHost + '/mobile_errors?' + query )
      .success(function(data){
        log('Error logged')
      })
      .error(function(error){
        console.error('Error logging error')
      })
    },
    select: function(table, collection, id, callBack, verbose){
      var sqlString = 'select * from ' + table + ' where active="true" ' + (id?'and id="'+id+'"':'')
      this.execute(sqlString, function(results) {
        for (var i=0; i<results.rows.length; i++) {
          collection.push(results.rows.item(i))
        }
        if(callBack){callBack()}
      }, verbose)
      return collection
    },
    stringForInsert: function(table, fields, values, callBack, verbose) {
      return 'insert into ' + table + ' (' + fields.join(',') + ') values ("' + values.join('","') + '")'
    },
    insert: function(table, fields, values, callBack, verbose) {
      var sqlString = db.stringForInsert(table, fields, values, callBack, verbose)
      this.execute(sqlString, callBack, verbose)
    },
    stringForUpdate: function(table, fields, values, id, callBack, verbose) {
      var sqlString = 'update ' + table + ' set '
      fields.forEach(function(field, index){
        sqlString += field + ' = "' + values[index] + '"' + (index + 1 == fields.length ? ' ' : ', ')
      })
      sqlString += 'where id = "' + id + '"'
      return sqlString
    },
    update: function(table, fields, values, id, callBack, verbose){
      var sqlString = db.stringForUpdate(table, fields, values, id, callBack, verbose)
      this.execute(sqlString, callBack, verbose)
    },
    insertOrUpdateCollection: function(table, fields, data, existingIds, collection, verbose) {
      array = []

      data.forEach(function(d){
        d.categoryId = d.category_id
        var values = fields.map(function(f){return d[f]})
        if (existingIds.has(Number(d.id))) {
          array.push(db.stringForUpdate(table, fields, values, d.id, undefined, verbose))
        } else {
          values.id = d.id
          array.push(db.stringForInsert(table, fields, values, undefined, verbose))
          collection.push(d)
        }
      })

      db.executeTransaction(array, undefined, undefined, verbose)
    },
    delete: function(table, ids, verbose) {
      var sqlString = 'delete from ' + table + (ids ? ' where id in (' + ids + ')' : '')
      this.execute(sqlString, undefined, verbose)
    },
    executeTransaction: function(sqlStrings, executionCallBack, transactionCallBack, verbose) {
      verbose = verbose || globalVerbose

      angular.db.transaction(function(tx) {
        sqlStrings.forEach(function(sqlString){
          if(verbose > 1) {
            log('Executing query' + (verbose > 2 ? ': ' + sqlString : ''))
          }
          tx.executeSql(sqlString,[], function(tx, results) {
            var lines = (results.rowsAffected ? results.rowsAffected + ' affected' : results.rows.length) + ' lines'
            if(verbose > 1) {
              log('Query executed successfully (' + lines + ')' + (verbose > 2 ? ': ' + sqlString : ''))
            }
            if (executionCallBack){executionCallBack(results)}
          }, function(tx, error) {
            db.postError({message: 'Error fetching data: ' + error.message})
            console.error('!!! Error executing query: ' + error.message)
          })
        })
      }, function(e){log(e)}, transactionCallBack )
    },
    execute: function(sqlString, callBack, verbose){
      db.executeTransaction([sqlString], callBack, undefined, verbose)
    },
    executeAndLog: function(sqlString, verbose) {
      db.execute(sqlString, function(r){for(i=0;i<r.rows.length;i++){log(r.rows.item(i))}}, verbose)
    },
    recreateDB: function(callBack) {
      log('>>>> Recreating DB')
      db.execute('DROP TABLE prayers_table', function(){
        db.execute('CREATE TABLE prayers_table ( id integer primary key )', function(){
          db.execute('DROP TABLE categories_table', function(){
            db.execute('CREATE TABLE categories_table ( id integer primary key )', function(){
              log('>>>> DB recreated successfully')
              if(callBack){callBack()}
            })
          })
        })
      })

      localStorage.lastUpdatedCategoriesAt = 0
      localStorage.lastUpdatedPrayersAt = 0
    },
    documentation: {
      load: '(callBack) Initializes the DB',
      prepareSchema: '(table, fieldsObj, callBack) Alters a table given a set of fields',
      createRawTable: '(table, callBack) Creates an empty table with a dummy element',
      addColumns: '(table, fieldsObj, callBack) Adds a new column to a table',
      loadFromRemoteServer: '(url, collection, lastUpdatedVariable, callBack) Loads data from the remote server',
      postError: '(data) Posts errors to the remote server',
      select: '(table, collection, id, callBack, verbose) Selects the DB based on the given id, if given, and inserts the result inthe collection ',
      stringForInsert: '(table, fields, values, callBack, verbose) Creates a SQL INSERT string',
      insert: '(table, fields, values, callBack, verbose) Executes an SQL INSERT statement',
      stringForUpdate: '(table, fields, values, id, callBack, verbose) Creates a SQL UPDATE string',
      update: '(table, fields, values, id, callBack, verbose) Executes an SQL UPDATE statement',
      insertOrUpdateCollection: '(table, fields, data, existingIds, collection, verbose) Executes an SQL INSERT or UPDATE statement based the given id (if it exists on the DB or not)',
      delete: '(table, ids, verbose) Executes a SQL DELETE statement',
      executeTransaction: '(sqlStrings, executionCallBack, transactionCallBack, verbose) Executes a set of SQL strings in a single transaction',
      execute: '(sqlString, callBack, verbose) Executes a single SQL statement',
      executeAndLog: '(sqlString, verbose) Executes a single SQL statement and logs the results (no callBack)',
      recreateDB: '(callBack) Drops and creates again the tables',
    }
  }
})

services.service('TranslationService', function() {
  var translations = {
    pt: {
      prayers: 'Orações',
      allahuabha: 'Alláh-u-Abhá',
      loading: 'Carregando',
      configurations: 'Configurações',
      categories: 'Categorias',
      loadingPrayers: 'As orações estão sendo carregadas',
      restart: 'Reiniciar',
      search: 'Busca',
      vibrationIntensity: 'Intensidade da vibração',
      showWatermark: 'Exibir marca d\'água',
      words: 'palavras',
      foundPrayers: 'orações encontradas',
    },
    en: {
      prayers: 'Prayers',
      allahuabha: 'Alláh-u-Abhá',
      loading: 'Loading',
      configurations: 'Configurations',
      categories: 'Categories',
      loadingPrayers: 'Loading prayers',
      restart: 'Restart',
      search: 'Search',
      vibrationIntensity: 'Vibration intensity',
      showWatermark: 'Show watermark',
      words: 'words',
      foundPrayers: 'prayers found',
    },
    es: {
      prayers: 'Oraciones',
      allahuabha: 'Alláh-u-Abhá',
      loading: 'Cargando',
      configurations: 'Configuraciones',
      categories: 'Categorias',
      loadingPrayers: 'Las oraciones se están cargando',
      restart: 'Reiniciar',
      search: 'Busca',
      vibrationIntensity: 'Intensidade da vibracion',
      showWatermark: 'Exhibir marca de agua',
      words: 'palavras',
      foundPrayers: 'oraciones encontradas',
    },
  }

  return {
    load: function() {
      return translations[localStorage.language]
    }
  }
})

vibrate = function(duration){
  var vibrationIntensity = Number(localStorage.vibrationIntensity)
  log('Vibrating with duration: ' + vibrationIntensity * duration + 'ms')
  if(navigator.notification) { navigator.notification.vibrate(vibrationIntensity * duration) }
}
log = function() { return console.log.apply(console, arguments) }
Array.prototype.has = function(element) { return this.indexOf(element) > 0}