var services = angular.module('services', [])

services.service('PrayersService', function(){
  var files = [],
      filenames = ['prayer1.json','prayer2.json','prayer3.json','prayer4.json','prayer5.json',]

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
