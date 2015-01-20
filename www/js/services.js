var services = angular.module('services', [])

services.service('PrayersService', function(){
  var files = [],
      filenames = listFiles('/www/json_prayers/')

  filenames.forEach(function(filename){
    var file = readFile('/www/json_prayers/'+filename)
    files.push({id: file.id, categoryId: file.categoryId, author: file.author, body: file.body})
  })
  return files
})

services.service('CategoriesService', function(){
  return [
    { id: 1, title: 'Ajuda' },
    { id: 2, title: 'Desprendimento' },
  ]
})


function readFile (file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    allText = JSON.parse(rawFile.responseText)
  }
  rawFile.send();
  return allText
}


function listFiles (dir) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", dir, false);
  rawFile.onreadystatechange = function () {
    allText = rawFile.responseText.split(/[\<\>]/).filter(function(d){return d.substr(-4)=='json'})
  }
  rawFile.send();
  return allText
}
