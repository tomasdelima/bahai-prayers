'use strict'

import {
  AsyncStorage,
} from 'react-native'

var SQLite   = require('react-native-sqlite-storage')
SQLite.enablePromise(true)

var parseDBResponse = function (dbResponse) {
  var parsedData = []

  for (let i = 0; i < dbResponse[0].rows.length; i++) {
    parsedData.push(dbResponse[0].rows.item(i))
  }

  return parsedData
}

var loadFromDB = function (table, where, orderBy) {
  var key = table + ':' + JSON.stringify(where)
  var cacheKey = 'loaded:' + key

  if (global[cacheKey]) {
    console.log('CACHE: LOADED: ' + cacheKey)
    return new Promise(function (resolve, reject) {
      resolve(global[cacheKey])
    })
  } else {
    console.log('DB:    START:  ' + key)
    return global.db.select(table, where, orderBy).then(function (results) {
      console.log('CACHE: SET:    ' + cacheKey)
      global[cacheKey] = results

      console.log('DB:    END:    ' + key)
      return results
    })
  }
}

var flushCache = function (key) {
  console.log('CACHE: FLUSH:  ' + key)
  global[key] = null
}

var loadFromRemoteServer = function (url, table, where) {
  return global.db.select(table, where).then(function (results) {
    var existingIds = results.map((r) => r.id)

    if (!global['fetched:' + url]) {
      console.log('FETCH: START:  ' + url)
      return fetch(url).then((response) => {
        var parsedResponse = JSON.parse(response._bodyInit)
        var loadedData = JSON.parse(parsedResponse.data)

        global['fetched:' + url] = true

        global.db.transaction(function (tx) {
          var inserted = 0, updated = 0
          loadedData.map(function (item) {
            if(existingIds.indexOf(item.id) < 0) {
              global.db.insert(table, item)
              inserted += 1
            } else {
              global.db.update(table, item)
              updated += 1
            }
          })
          console.log('DB:    UPSERT: Inserted ' + inserted + ', Updated ' + updated + ' into ' + table)
        })

        AsyncStorage.setItem('last_updated_at', parsedResponse.time)
        console.log('FETCH: END:    ' + url)
        return loadedData
      })
    }
  })
}

var fullTextSearch = function (table, keywords) {
  var start = Date.now()
  var sqlString = "SELECT * FROM " + table

  var keywordsQuery = []
  var fields = table == 'categories' ? ['title'] : ['body', 'preamble', 'author']
  keywords.split(/\s+/g).forEach((keyword, i) => {
    var fieldsQuery = []
    fields.forEach((field, j) => {
      fieldsQuery.push(field + " LIKE '%" + keyword + "%'")
    })
    keywordsQuery.push(fieldsQuery.join(" OR "))
  })

  sqlString += " WHERE active='true' AND (" + keywordsQuery.join(") AND (") + ")"
  return global.db.executeSql(sqlString).then(parseDBResponse).then((data) => {
    return {start: start, data: data}
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
  return global.db.executeSql(sqlString).then(parseDBResponse)
}

var update = function (table, obj, transaction) {
  var columns = []
  Object.keys(obj).map((key) => {columns.push(key + " = \"" + obj[key] + "\"")})

  var sqlString = "UPDATE " + table + " SET " + columns.join(", ") + " WHERE id = " + obj.id
  return (transaction || global).db.executeSql(sqlString).then(() => {
  })
}

var insert = function (table, obj, transaction) {
  var columns = Object.keys(obj)
  var values = []

  Object.keys(obj).map((key) => {values.push(obj[key])})

  var sqlString = "INSERT INTO " + table + " (" + columns.join(", ") + ") VALUES (\"" + values.join("\", \"") + "\")"
  return (transaction || global).db.executeSql(sqlString)
}

var createTables = function (db) {
  db.transaction(function (tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS categories (id INT PRIMARY KEY NOT NULL, title TEXT, active TEXT, special_category TEXT, created_at TEXT, updated_at TEXT)")
    tx.executeSql("CREATE TABLE IF NOT EXISTS prayers (id INT PRIMARY KEY NOT NULL, category_id INT NOT NULL, author TEXT, body TEXT, preamble TEXT, active TEXT, special_prayer TEXT, stared TEXT, created_at TEXT, updated_at TEXT)")
  }).then(() => {
    console.log("DB:    LOADED")
    db.insert = insert
    db.update = update
    db.select = select
    db.loadFromRemoteServer = loadFromRemoteServer
    db.loadFromDB = loadFromDB
    db.flushCache = flushCache
    db.fullTextSearch = fullTextSearch
  }).catch((e) => {
    recreateTables(db)
  })
}

var recreateTables = function (db) {
  console.log("DB:    RECREATING")
  db.transaction(function (tx) {
    tx.executeSql("DROP TABLE categories")
    tx.executeSql("DROP TABLE prayers")
  }).then(() => {
    createTables(db)
  })
}

SQLite.openDatabase("bahai-prayers.db", "1.0", "Bahai Prayers Database", 200000).then(function (db) {
  global.db = db
  createTables(db)
}).catch(function (error) {
  console.log("DB:    ERROR:  " + error)
})
