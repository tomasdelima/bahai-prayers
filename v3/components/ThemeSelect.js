import React from 'react'

class ThemeSelect extends React.Component {
  setTheme (newTheme) {
    store.theme = Object.keys(t.themes).filter(i => i == newTheme)[0]
  }

  render() {
    return <Flex row>
      <Ionicons style={[s.wide(70), s.textAlignCenter, s.size(30)]} name='ios-color-palette' color={t.colors.text} />

      <Picker selectedValue={store.theme} style={[s.grow()]} onValueChange={this.setTheme.bind(this)}>
        {Object.keys(t.themes).sort((a,b) => a.Name < b.Name ? -1 : 1).map((theme) =>
          <Picker.Item key={theme} label={theme} value={theme} color={t.colors.text} />
        )}
      </Picker>
    </Flex>
  }
}

export default observer(ThemeSelect, {})
