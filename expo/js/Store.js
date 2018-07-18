import { computed, observable } from 'mobx'

export default class Store {
  // Persistent observables
    @observable languages = []
    @observable language = {}
    @observable tags = []
    @observable prayers = []
    @observable theme

  // Transient observables
    @observable loaded = false
    @observable route = {}
    @observable prayerId
    @observable searchHistory = []
    @observable searchResultsHistory = []
    @observable kind = "GENERAL"
    // @observable kind = "OCCASSIONAL"
    // @observable kind = "OBLIGATORY"

  @computed get searchResults () {
    return this.searchResultsHistory.slice(-1)[0]
  }

  @computed get searchKeywords () {
    return this.searchHistory.slice(-1)[0]
  }

  @computed get all () {
    return {
      languages: this.languages,
      language: this.language,
      tags: this.tags,
      prayers: this.prayers,
      theme: this.theme,
    }
  }
}
