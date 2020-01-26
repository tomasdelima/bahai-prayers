export default class ApiClient {
  static domain = 'https://bahaiprayers.net'
  static uris = {
    languages: () => `${this.domain}/api/prayer/languages`,
    tags:      () => `${this.domain}/api/prayer/tags?languageid=${store.languageId}`,
    prayers:   () => `${this.domain}/api/prayer/prayersystembylanguage?languageid=${store.languageId}&html=true`,
  }
  static key = resource => `${resource}-${resource != 'languages' && store.languageId}`

  static load (resource, filter, sort) {
    // console.warn(`Loading: ${this.key(resource)}`)

    return AsyncStorage.getItem(this.key(resource))
      .then((data,a,b) => {
        if (data) {
          data = JSON.parse(data)
          store[resource] = filter ? data.filter(filter) : data
        } else {
          this.fetchRemoteData(resource, filter, sort)
        }
      })
  }

  static authors = {
    1: "O Báb",
    2: "Bahá'u'lláh",
    3: "'Abdu'l-Bahá",
  }

  static parsers = {
    languages: (data) => data.map(language => ({
      id: language.Id,
      name: language.Name,
    })),
    tags: (data) => data.map(tag => ({
      id: tag.Id,
      name: tag.Name,
      kind: tag.Kind,
    })),
    prayers: ({ Prayers }) => Prayers.map(prayer => ({
      id: prayer.Id,
      author: this.authors[prayer.AuthorId],
      text: prayer.Text,
      tags: prayer.Tags,
    })),
  }

  static fetchRemoteData (resource, filter) {
    // console.warn(`Fetching: ${this.key(resource)}`)

    return Axios.get(this.uris[resource]())
      .then(response => {
        var data = this.parsers[resource](response.data)
        store[resource] = filter ? data.filter(filter) : data
        this.saveLocalData(resource, data)
      })
      .catch(error => console.error(error))
  }

  static saveLocalData (resource, data) {
    // console.warn(`Saving: ${this.key(resource)}`)

    AsyncStorage.setItem(this.key(resource), JSON.stringify(data))
  }
}
