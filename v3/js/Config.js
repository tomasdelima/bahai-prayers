export default class Config {
  constructor () {
    autorun(this.save)
  }

  load (callBack, reload) {
    return AsyncStorage.getItem("data").then((result) => {
      var obj = JSON.parse(result)

      if (!obj || reload) {
        console.log((!obj ? "No configurations detected: " : "") + "Loading data from API")
        callBack && callBack()
        new ApiClient().loadAll()
      } else {
        console.log("Loaded configs: " + Object.keys(obj).map(k => k + (obj[k].constructor.name == "Array" ? " (" + obj[k].length + ")" : "")).join(", "))
        Object.keys(obj).map((k) => store[k] = obj[k])
        callBack && callBack(obj)
        store.loading = false
      }
    })
  }

  save () {
    if (!store.loading) {
      AsyncStorage.setItem("data", JSON.stringify(store.all))
        .then(() => console.log("Saved configs"))
    }
  }
}
