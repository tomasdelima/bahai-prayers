import React from 'react'

export default class Container extends React.Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', function() {
      store.route = {goBack: true}
      return true
    })
  }

  render () {
    return <ScrollView containerStyle={[s.high(),s.red]} style={[s.wide(), s.white, s.marginTop(statusBarHeight), s.paddings(10)]}>
      {this.props.children}
    </ScrollView>
  }
}

