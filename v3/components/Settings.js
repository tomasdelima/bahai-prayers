import React from 'react'

class Settings extends React.Component {
  render() {
    return <Container noTopBar noSearch>
      <View>
        <LanguageSelect/>
        <ThemeSelect/>
      </View>
    </Container>
  }
}

export default observer(Settings, {})
