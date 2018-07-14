export default class ApiClient {
  url = {
    languages:         () => "https://bahaiprayers.net/api/prayer/Languages",
    tags:    (languageId) => "https://bahaiprayers.net/api/prayer/tags?languageid=" + languageId,
    prayers: (languageId) => "https://bahaiprayers.net/api/prayer/prayersystembylanguage?languageid=" + languageId,
  }

  initialLoad () {
    this.load('languages')
      .then(() => this.setDefaultLanguage())
      .then(() => this.load('tags', store.language.Id))
      .then(() => this.load('prayers', store.language.Id))
      .then(() => store.loaded = true)
  }

  setDefaultLanguage () {
    store.language = store.languages.filter(l => l.Culture == "pt")[0]
  }

  load (resource, options) {
    console.log("Loading " + resource)

    var authors = {
      1: "O Báb",
      2: "Bahá'u'lláh",
      3: "'Abdu'l-Bahá",
    }

    return Axios.get(this.url[resource](options)).then(response => {
      console.log("Loaded " + resource)
      if (resource == "prayers") {
        var prayers = response.data.Prayers
        prayers.map(p => Object.assign(p, {Author: authors[p.AuthorId]}))
        store[resource] = prayers
      } else {
        store[resource] = response.data
      }
    })
  }
}
