import React from 'react'

class LanguageSelect extends React.Component {
  setLanguage (languageId) {
    store.language = store.languages.filter(i => i.Id == languageId)[0]
    new Config().load(null, true)
  }

  render() {
    return <Flex>
      <Picker selectedValue={store.language.Id} style={[s.wide()]} onValueChange={this.setLanguage.bind(this)}>
        {store.languages.sort((a,b) => a.Name < b.Name ? -1 : 1).map((language) =>
          <Picker.Item key={language.Id} label={language.Name} value={language.Id} />
        )}
      </Picker>
    </Flex>
  }
}

export default observer(LanguageSelect, {})
