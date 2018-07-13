import React from 'react'
import { observer } from 'mobx-react/native'
import { autorun } from 'mobx'

require('./Import')

@observer
export default class App extends React.Component {
  constructor () {
    super()
    global.store = new Store()
    new Config().load()
  }

  render() {
    return store.loaded && <Navigator/>
  }
}
