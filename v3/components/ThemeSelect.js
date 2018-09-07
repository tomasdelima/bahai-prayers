import React from 'react'

class ThemeSelect extends React.Component {
  setTheme (newTheme) {
    store.theme = Object.keys(t.themes).filter(i => i == newTheme)[0]
  }

  render() {
    return <Flex>
      <Picker selectedValue={store.theme} style={[s.wide()]} onValueChange={this.setTheme.bind(this)}>
        {Object.keys(t.themes).sort((a,b) => a.Name < b.Name ? -1 : 1).map((theme) =>
          <Picker.Item key={theme} label={theme} value={theme} />
        )}
      </Picker>
    </Flex>
  }
}

export default observer(ThemeSelect, {})
