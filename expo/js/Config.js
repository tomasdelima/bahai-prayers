import React from 'react'
import { autorun, reaction, when } from 'mobx'
import { observer } from 'mobx-react/native'

@observer
export default class Config extends React.Component {
  constructor () {
    super()
    autorun(this.save)
  }

  load (forceInitialLoad) {
    AsyncStorage.getItem("data").then((result) => {
      var obj = JSON.parse(result)
      console.log("Loaded configs: " + Object.keys(obj).map(k => k + (obj[k].length ? " (" + obj[k].length + ")" : "")).join(", "))

      if (!obj || forceInitialLoad) {
        console.log("No configurations detected: loading data from API")
        new ApiClient().initialLoad()
      } else {
        Object.keys(obj).map((k) => store[k] = obj[k])
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