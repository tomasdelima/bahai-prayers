import React from 'react'
import { observer } from 'mobx-react/native'

@observer
export default class LanguageSelect extends React.Component {
  setLanguage (language) {
    store.language = language
  }

  render() {
    return <Flex center1 marginTop={s.statusBarHeight}>
      <ScrollView style={[]}>
        {store.languages.sort((a,b) => a.Name < b.Name ? -1 : 1).map((language) => <TouchableOpacity key={language.Id} onPress={() => this.setLanguage(language)}>
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
