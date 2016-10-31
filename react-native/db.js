'use strict'

var SQLite   = require('react-native-sqlite-storage')
SQLite.enablePromise(true)

var loadFromDB = function (table, where, orderBy) {
  var cacheKey = 'loaded:' + table + ':' + JSON.stringify(where)

  if (global[cacheKey]) {
    console.log('CACHE: LOADED: ' + JSON.stringify({table: where}))
    return new Promise(function (resolve, reject) {
      resolve(global[cacheKey])
    })
  } else {
    console.log('DB:    START:  ' + table)
    return global.db.select(table, where, orderBy).then(function (results) {
      var existingData = []

      for (let i = 0; i < results[0].rows.length; i++) {
        existingData.push(results[0].rows.item(i))
      }

      console.log('CACHE: SET:    ' + table + ':' + JSON.stringify(where))
      global[cacheKey] = existingData

      console.log('DB:    END:    ' + table)
      return existingData
    })
  }
}

var loadFromRemoteServer = function (url, table, where) {
  return global.db.select(table, where).then(function (results) {
    var existingIds = []

    for (var i = 0; i < results[0].rows.length; i++) {
      existingIds.push(results[0].rows.item(i).id)
    }

    if (!global['fetched:' + url]) {
      console.log('FETCH: START:  ' + url)
      fetch(url).then(function(response) {
        var loadedData = JSON.parse(response._bodyInit)
        // if(table == 'categories') {
        //   var loadedData = [
        //     {id: 1, title: 'Category 1', active: true},
        //     {id: 2, title: 'Category 2', active: true},
        //     {id: 3, title: 'Category 3', active: true},
        //     {id: 4, title: 'Category 4', active: true},
        //     {id: 5, title: 'Category 5', active: true},
        //   ]
        // } else {
        //   var loadedData = [
        //     {id: 1, active: true, category_id: 1, author: "Not a real author", body: "Not a real prayer 1", preamble: ""},
        //     {id: 2, active: true, category_id: 1, author: "Not a real author", body: "Not a real prayer 2", preamble: ""},
        //   ]
        // }
        global['fetched:' + url] = true

        global.db.transaction(function (tx) {
          loadedData.map(function (item) {
            if(existingIds.indexOf(item.id) < 0) {
              global.db.insert(table, item)
            } else {
              global.db.update(table, item)
            }
          })
        })

        console.log('FETCH: END:    ' + url)
        return loadedData
      }).catch(function (error) {
        console.log(error)
      })
    }
  })
}

var select = function (table, where, orderBy) {
  var sqlString = "SELECT * FROM " + table
  if(where) {
    var items = []
    for(var key in where) {items.push(key + " IN ('" + where[key].join("', '") + "')")}
    sqlString += " WHERE " + items.join(" AND ")
  }
  if(orderBy) { sqlString += " ORDER BY " + orderBy }
  return global.db.executeSql(sqlString)
}

var update = function (table, obj, transaction) {
  var columns = []
  Object.keys(obj).map((key) => {columns.push(key + " = \"" + obj[key] + "\"")})

  var sqlString = "UPDATE " + table + " SET " + columns.join(", ") + " WHERE id = " + obj.id
  return (transaction || global).db.executeSql(sqlString)
}

var insert = function (table, obj, transaction) {
  var columns = Object.keys(obj)
  var values = []

  Object.keys(obj).map((key) => {values.push(obj[key])})

  var sqlString = "INSERT INTO " + table + " (" + columns.join(", ") + ") VALUES (\"" + values.join("\", \"") + "\")"
  return (transaction || global).db.executeSql(sqlString)
}

SQLite.openDatabase("bahai-prayers.db", "1.0", "Bahai Prayers Database", 200000).then(function (db) {
  global.db = db
  db.transaction(function (tx) {
    // tx.executeSql("DROP TABLE categories")
    tx.executeSql("CREATE TABLE IF NOT EXISTS categories (id INT PRIMARY KEY NOT NULL, title TEXT, active TEXT, created_at TEXT, updated_at TEXT)")
    tx.executeSql("CREATE TABLE IF NOT EXISTS prayers (id INT PRIMARY KEY NOT NULL, category_id INT NOT NULL, author TEXT, body TEXT, preamble TEXT, active TEXT, created_at TEXT, updated_at TEXT)")
    global.db.insert = insert
    global.db.update = update
    global.db.select = select
    global.db.loadFromRemoteServer = loadFromRemoteServer
    global.db.loadFromDB = loadFromDB
    console.log("DB:    LOADED")
  })
}).catch(function (error) {
  console.log("DB:    ERROR:  " + error)
})
