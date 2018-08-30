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
      <TouchableOpacity onPress={this.back} onLayout={e => this.setState({backWidth: e.nativeEvent.layout.width})} style={[s.paddings(10)]}>
        {lastRoute && <Text>
          <FontAwesome name="chevron-left" />
          <Text> {lastRoute.name}</Text>
        </Text>}
      </TouchableOpacity>

      <Flex paddings={10} size={20}>{currentRoute.name}</Flex>

      <View style={s.wide(this.state.backWidth)} />
    </Flex>
  }
}

// export default observer(TopBar, {})
export default TopBar