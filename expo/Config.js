import React from 'react'
import {autorun, reaction, when} from 'mobx'
import {observer} from 'mobx-react/native'

@observer
export default class Config extends React.Component {
  constructor () {
    super()
    autorun(this.save)
  }

  load () {
    AsyncStorage.getItem("data")
      .then((result) => {
        console.log("Loaded configs")
        var obj = JSON.parse(result)
        Object.keys(obj).map((k) => store[k] = obj[k])
        store.loaded = true
      })
  }

  save () {
    if (store.loaded) {
      AsyncStorage.setItem("data", JSON.stringify(store.all))
        .then(() => console.log("Saved configs"))
    }
  }
}