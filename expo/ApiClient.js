export default class ApiClient {
  static domain = 'https://bahaiprayers.net'
  static uris = {
    languages:         () => `${this.domain}/api/prayer/languages`,
    tags:    (languageId) => `${this.domain}/api/prayer/tags?languageid=${languageId}`,
    prayers: (languageId) => `${this.domain}/api/prayer/prayersystembylanguage?languageid=${languageId}`,
  }

  static initialLoad () {
    this.load('languages')
      .then(() => this.setDefaultLanguage())
      .then(() => this.load('tags', store.language.Id))
      .then(() => this.load('prayers', store.language.Id))
      .then(() => store.loaded = true)
  }

  static setDefaultLanguage () {
    store.language = store.languages.filter(language => language.Culture == 'pt')[0]
  }

  static load (resource, options) {
    console.log(`Loading ${resource}`)

    var authors = {
      1: "O Báb",
      2: "Bahá'u'lláh",
      3: "'Abdu'l-Bahá",
    }

    return Axios.get(this.uris[resource](options)).then(response => {
      console.log(`Loaded ${resource}`)

      if (resource == 'prayers') {
        store[resource] = response.data.Prayers.map(prayer => prayer.Author = authors[prayer.AuthorId])
      } else {
        store[resource] = response.data
      }
    })
  }
}
