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

    return Axios.get(this.url[resource](options)).then(response => {
      console.log("Loaded " + resource)
      store[resource] = response.data
    })
  }

  loadLanguages () {
    console.log("Loading languages")
    return Axios.get(this.url.languages()).then(response => {
      store.languages = response.data
    })
  }

  loadTags (languageId) {
    console.log("Loading tags")
    return Axios.get(this.url.tags(languageId)).then(response => {
      store.tags = response.data
    })
  }

  loadPrayers (languageId) {
    console.log("Loading prayers")
    return Axios.get(this.url.prayers(languageId)).then(response => {
      store.prayers = response.data
    })
  }
}
