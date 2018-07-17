import React from 'react'
import { observer } from 'mobx-react/native'

@observer
export default class Container extends React.Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', function() {
      store.route = {goBack: true}
      return true
    })
  }

  render () {
    return <ScrollView containerStyle={[s.high()]} style={[s.wide(), bg.primary, s.marginTop(statusBarHeight), s.paddings(10)]}>
      {this.props.children}
    </ScrollView>
  }
}

