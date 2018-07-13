import React from 'react'
import {observer} from 'mobx-react/native'

require('./Import')

@observer
export default class App extends React.Component {
  constructor () {
    super()
    global.store = new Data()
  }

  render() {
    return <Flex high white center1 marginTop={s.statusBarHeight}>
      <LanguageSelect/>
    </Flex>
  }
}
