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
    return <ScrollView>
      {store.languages.map((language) => <View key={language.Id}>
        <Text>{language.Name}</Text>
        <Image source={{uri: language.FlagLink}} style={{width: 15, height: 10}}/>
      </View>)}
    </ScrollView>
  }
}
