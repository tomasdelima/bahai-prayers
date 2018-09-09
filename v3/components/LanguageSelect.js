import React from 'react'

class LanguageSelect extends React.Component {
  componentDidMount () {
    store.languages = [store.language]
    new ApiClient().load('languages')
      .catch(() => {})
  }

  setLanguage (languageId) {
    store.language = store.languages.filter(i => i.Id == languageId)[0]
    new Config().load(null, true)
  }

  render() {
    return <Flex row>
      <FontAwesome style={[s.wide(70), s.textAlignCenter, s.size(30)]} name='language' color={t.colors.text} />

      <Picker enabled={store.languages.length > 1} selectedValue={store.language.Id} style={[s.grow()]} onValueChange={this.setLanguage.bind(this)}>
        {store.languages.filter(l => l.Id).sort((a,b) => a.Name < b.Name ? -1 : 1).map((language) =>
          <Picker.Item key={language.Id} label={language.Name} value={language.Id} />
        )}
      </Picker>
    </Flex>
  }
}

export default observer(LanguageSelect, {})
