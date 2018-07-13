import {computed, observable} from 'mobx'

export default class Store {
  @observable languages = []
  @observable language = {}
  @observable tags = []
  @observable prayers = []
  @observable loaded = false

  @computed get all () {
    return {
      languages: this.languages,
      language: this.language,
      tags: this.tags,
      prayers: this.prayers,
    }
  }
}
