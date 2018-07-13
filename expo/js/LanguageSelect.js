import React from 'react'
import {observer} from 'mobx-react/native'

@observer
export default class LanguageSelect extends React.Component {
  constructor () {
    super()
    global.store = new Data()
    store.load().then(() => {
      // console.log(store.languages)
    })
    this.state = {l: {}}
  }

  foo (a) {
    this.setState({l: a})
  }

  render() {
    return <Flex center1 marginTop={s.statusBarHeight}>
      <ScrollView style={[]}>
        {store.languages.sort((a,b) => a.Name < b.Name ? -1 : 1).map((language) => <TouchableOpacity key={language.Id} onPress={() => store.language = language}>
          <Flex row center2 high={50}>
            <Flex wide={150} alignRight>{language.Name}</Flex>
            <Flex> – </Flex>
            <Flex wide={150}>{language.English}</Flex>
          </Flex>
        </TouchableOpacity>)}
      </ScrollView>
    </Flex>
  }
}
