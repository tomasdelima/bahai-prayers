import {computed, observable} from 'mobx'

export default class Data {
  @observable languages = []
  @observable language = {}
  @observable tags = []
  @observable prayers = []
  @observable flags = []
  @observable loaded = false

  url = {
    languages:         () => "https://bahaiprayers.net/api/prayer/Languages",
    tags:    (languageId) => "https://bahaiprayers.net/api/prayer/prayersystembylanguage?html=true&languageid=" + languageId,
    prayers: (languageId) => "https://bahaiprayers.net/api/prayer/tags?languageid=" + languageId,
  }

  load () {
    console.log("Loading languages")
    return Axios.get(this.url.languages()).then(response => {
      this.languages = response.data
    })
  }

  @computed get all () {
    return {
      language: this.language,
      languages: this.languages,
    }
  }
}
