import React from 'react'

class Container extends React.Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', function() {
      store.route = { goBack: true }
      return true
    })
  }

  render () {
    return <ScrollView containerStyle={[s.high()]} style={[s.wide(), bg.primary, s.marginTop(statusBarHeight)]}>
      {!this.props.noTopBar && <TopBar />}

      <View style={[s.paddings(10)]}>
        {this.props.children}
      </View>
    </ScrollView>
  }
}

export default observer(Container, {})
