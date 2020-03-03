export default class Store {
  @observable languageId
  @observable tagId
  @observable prayerId

  @observable languages
  @observable tags
  @observable prayers
  @observable prayer
  @observable starred = []
  @observable holidays = []

  @observable muteTapSound = true
  @observable stopTapVibration = false

  @observable topBarLabels = []
  @computed get topBarLabel () {
    return this.topBarLabels.slice().reverse()[0]
  }

  @observable fontSize = 22

  persistentKeys = ['languageId', 'starred', 'muteTapSound', 'stopTapVibration']

  constructor () {
    // AsyncStorage.clear()

    this.persistentKeys.map((key) => {
      AsyncStorage.getItem(key).then(value => {
        if (!this[key] || value) {
          this[key] = JSON.parse(value)
        }

        observe(this, key, (change) => AsyncStorage.setItem(key, JSON.stringify(change.object)))
      })
    })
  }
}
