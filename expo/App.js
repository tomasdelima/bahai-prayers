import React from 'react'
import {observer} from 'mobx-react/native'
import {autorun} from 'mobx'

require('./Import')

@observer
export default class App extends React.Component {
  constructor () {
    super()
    global.store = new Data()
    this.config = new Config()
    this.config.load()
  }

  render() {
    return store.loaded && <Flex high white center1 marginTop={s.statusBarHeight}>
      <Flex>{store.language.Name}</Flex>
      <LanguageSelect/>
    </Flex>
  }
}
