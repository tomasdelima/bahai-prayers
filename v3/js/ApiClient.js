export default class ApiClient {
  url = {
    languages:         () => "https://bahaiprayers.net/api/prayer/Languages",
    tags:    (languageId) => "https://bahaiprayers.net/api/prayer/tags?languageid=" + languageId,
    prayers: (languageId) => "https://bahaiprayers.net/api/prayer/prayersystembylanguage?languageid=" + languageId,
    holidays:          () => "https://badi-calendar.herokuapp.com/holidays",
  }

  loadAll () {
    store.loading = true
    var start = new Date()

    this.load('languages')
      .then(() => this.setDefaultLanguage())
      .then(() => this.load('tags', store.language.Id || 8))
      .then(() => this.load('prayers', store.language.Id || 8))
      .then(() => this.load('holidays'))
      .then(() => {
        console.log("Finished loading all resources in " + (new Date() - start)/1000 + " seconds")
        store.history = observable([])
        store.searchHistory = observable([])
        store.searchResultsHistory = observable([])
        store.route = {screen: "Tags"}
        store.loading = false
      })
  }

  setDefaultLanguage () {
    store.language = store.language || store.languages.filter(l => l.Culture == "pt")[0]
  }

  load (resource, options) {
    var start = new Date()
    console.log("Loading " + resource, this.url[resource](options))

    var authors = {
      1: "O Báb",
      2: "Bahá'u'lláh",
      3: "'Abdu'l-Bahá",
    }

    return Axios.get(this.url[resource](options)).then(response => {
      console.log("Finished loading " + resource + " in " + (new Date() - start)/1000 + " seconds")
      if (resource == "prayers") {
        var prayers = response.data.Prayers
        prayers.map(p => Object.assign(p, {Author: authors[p.AuthorId]}))
        store[resource] = prayers
      } else {
        store[resource] = response.data
      }

      return response.data
    }).catch((e) => log("Error loading " + resource, e))
  }
}
