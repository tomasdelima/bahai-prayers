import React from 'react'
import {observer} from 'mobx-react/native'
import {autorun} from 'mobx'

require('./Import')

@observer
export default class App extends React.Component {
  constructor () {
    super()
    global.store = new Data()
    new Config().load()
  }

  render() {
    return store.loaded && <Flex high white center1 marginTop={s.statusBarHeight}>
      <Flex>{store.language.Name}</Flex>
      <LanguageSelect/>
    </Flex>
  }
}
