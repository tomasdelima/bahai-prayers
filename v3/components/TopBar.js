import React from 'react'

class TopBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  back () {
    store.route = {goBack: true}
  }

  render () {
    var history = store.history
    var currentRoute = history[history.length - 1]
    var lastRoute = history[history.length - 2]

    return <Flex row spacedIn>
      <TouchableOpacity onPress={this.back} onLayout={e => this.setState({backWidth: e.nativeEvent.layout.width})} style={[s.padding(10)]}>
        {lastRoute && <Text style={t.text}>
          <FontAwesome name="chevron-left" size={store.fontSize} />
        </Text>}
      </TouchableOpacity>

      <Flex padding={20} size={store.fontSize}>{currentRoute && currentRoute.name}</Flex>

      <View>
        {lastRoute && lastRoute.name && <FontSize/>}
      </View>
    </Flex>
  }
}

export default observer(TopBar)
