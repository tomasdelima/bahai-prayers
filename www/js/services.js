var services = angular.module('services', [])

services.service('PrayersService', function($http) {
  var self = this
  self.prayers = []

  return {
    load: function(categoryId) {
      // make request
      url = 'http://localhost:8100/categories/'+categoryId+'/prayers'
      // url = 'http://bahai-prayers-server.herokuapp.com/categories/'+categoryId+'/prayers'
      $http.get(url).success(function(data) {
        data.forEach(function(d) {
          // insert new songs
          angular.db.transaction(function (tx) {
            tx.executeSql('insert into prayers_table (id, categoryId, body, author) values (?,?,?,?)',
              [d.id, d.category_id, d.body, d.author],
              function(tx, results) {
                console.log('Insert success:',results)
                self.prayers.push(d)
              },
              function(tx, error) {
                console.log('Insert error:',tx,error)
              }
            )
          })
        })
      })

      // select prayers from sqlite
      angular.db.transaction(function(tx) {
        tx.executeSql('select * from prayers_table',[],
          function(tx, results) {
            var i
            for (i=0; i<results.rows.length; i++) {
              self.prayers.push(results.rows.item(i))
              console.log(self.prayers)
            }
          }
        )
      })
    },
  }
})

services.service('CategoriesService', function($http) {
  var self = this
  return {
    load: function() {
      return $http.get('http://bahai-prayers-server.herokuapp.com/categories').success(function(data) {
        self.categories = data
      })
    }
  }
})



