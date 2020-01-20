export default class Store {
  @observable languages = []
  @observable language = {}
  @observable tags = []
  @observable prayers = []
  @observable kind = "GENERAL"
  // @observable kind = "OCCASSIONAL"
  // @observable kind = "OBLIGATORY"
  // @observable kind = "TABLETS"

  @computed get language () {
    return {Id: 1}
  }
}
