export default class ApiClient {
  static domain = 'https://bahaiprayers.net'
  static uris = {
    languages:         () => `${this.domain}/api/prayer/languages`,
    tags:    (languageId) => `${this.domain}/api/prayer/tags?languageid=${languageId}`,
    prayers: (languageId) => `${this.domain}/api/prayer/prayersystembylanguage?languageid=${languageId}&html=true`,
  }

  static load (resource, options) {
    console.log(`Loading ${resource}: ${this.uris[resource](options)}`)

    var authors = {
      1: "O Báb",
      2: "Bahá'u'lláh",
      3: "'Abdu'l-Bahá",
    }

    return Axios.get(this.uris[resource](options)).then(response => {
      console.log(`Loaded ${resource}`)

      if (resource == 'prayers') {
        store[resource] = response.data.Prayers.map(prayer => ({...prayer, Author: authors[prayer.AuthorId]}))
      } else {
        store[resource] = response.data
      }
    })
  }
}
