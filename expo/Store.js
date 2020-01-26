export default class Store {
  @observable languageId
  @observable tagId
  @observable prayerId

  @observable languages
  @observable tags
  @observable prayers
  @observable prayer

  @observable topBarLabels = []
  @computed get topBarLabel () {
    return this.topBarLabels.slice().reverse()[0]
  }

  @observable fontSize = 28

  persistentKeys = ['languageId']

  constructor () {
    this.persistentKeys.map((key) => {
      AsyncStorage.getItem(key).then(value => {
        this[key] = value
        observe(this, key, (change) => AsyncStorage.setItem(key, '' + change.newValue))
      })
    })
  }
}
