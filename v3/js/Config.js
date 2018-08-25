import React from 'react'

class Config extends React.Component {
  constructor () {
    super()
    autorun(this.save)
  }

  load (callBack, forceInitialLoad) {
    return AsyncStorage.getItem("data").then((result) => {
      var obj = JSON.parse(result)

      if (!obj || forceInitialLoad) {
        console.log((!obj ? "No configurations detected: " : "") + "Loading data from API")
        callBack && callBack()
        new ApiClient().initialLoad()
      } else {
        console.log("Loaded configs: " + Object.keys(obj).map(k => k + (obj[k].constructor.name == "Array" ? " (" + obj[k].length + ")" : "")).join(", "))
        Object.keys(obj).map((k) => store[k] = obj[k])
        callBack && callBack()
        store.loaded = true
      }
    })
  }

  save () {
    if (store.loaded) {
      AsyncStorage.setItem("data", JSON.stringify(store.all))
        .then(() => console.log("Saved configs"))
    }
  }
}

export default decorate(Config, {
})
