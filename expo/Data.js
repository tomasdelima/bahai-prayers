import {observable} from 'mobx'

export default class Data {
  @observable languages = []
  @observable tags = []
  @observable prayers = []

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
}