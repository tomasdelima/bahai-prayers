class Store {
  // Persistent observables
    languages = []
    language = {}
    tags = []
    prayers = []
    theme

  // Transient observables
    loaded = false
    route = {}
    history = [{name: "Orações"}]
    prayerId
    searchHistory = []
    searchResultsHistory = []
    kind = "GENERAL"
    // kind = "OCCASSIONAL"
    // kind = "OBLIGATORY"

  get searchResults () {
    return this.searchResultsHistory.slice(-1)[0]
  }

  get searchKeywords () {
    return this.searchHistory.slice(-1)[0]
  }

  get all () {
    return {
      languages: this.languages,
      language: this.language,
      tags: this.tags,
      prayers: this.prayers,
      theme: this.theme,
    }
  }
}

export default decorate(Store, {
  languages: observable,
  language: observable,
  tags: observable,
  prayers: observable,
  theme: observable,
  observables: observable,
  loaded: observable,
  route: observable,
  prayerId: observable,
  searchHistory: observable,
  searchResultsHistory: observable,
  kind: observable,

  searchResults: computed,
  searchKeywords: computed,
  all: computed,
})
