export default class Data {
  url = {
    languages: "https://bahaiprayers.net/api/prayer/Languages",
    tags:    (languageId) => "https://bahaiprayers.net/api/prayer/prayersystembylanguage?html=true&languageid=" + languageId,
    prayers: (languageId) => "https://bahaiprayers.net/api/prayer/tags?languageid=" + languageId,
  }

  load () {
    console.log("Loading languages")
    Axios.get(this.url.languages).then(foo => {
      console.log(foo.data)
    })
  }
}