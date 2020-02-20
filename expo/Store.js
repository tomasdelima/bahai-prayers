export default class Store {
  @observable languageId
  @observable tagId
  @observable prayerId

  @observable languages
  @observable tags
  @observable prayers
  @observable prayer
  @observable starred

  @observable topBarLabels = []
  @computed get topBarLabel () {
    return this.topBarLabels.slice().reverse()[0]
  }

  @observable fontSize = 22

  persistentKeys = ['languageId', 'starred']

  constructor () {
    this.persistentKeys.map((key) => {
      AsyncStorage.getItem(key).then(value => {
        this[key] = JSON.parse(value)
        observe(this, key, (change) => AsyncStorage.setItem(key, JSON.stringify(change.newValue)))
      })
    })
  }
}
