import React from 'react';
import {observer} from 'mobx-react/native'

require('./Import')

@observer
export default class App extends React.Component {
  constructor () {
    super()
    global.store = new Data()
    store.load().then(() => {
      console.log(store.languages)
    })
  }

  render() {
    return <Flex high green center1 marginTop={s.statusBarHeight}>
      <ScrollView style={[s.center1, s.high, s.blue]}>
        {store.languages.map((language) => <Flex key={language.Id} row center>
          <Flex red textAlignCenter center1>{language.Name}</Flex>
          <Image source={{uri: language.FlagLink}} style={{width: 100, height: 80}}/>
        </Flex>)}
      </ScrollView>
    </Flex>
  }
}
