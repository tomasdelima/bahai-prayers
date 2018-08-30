import React from 'react'

class Container extends React.Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', function() {
      store.route = { goBack: true }
      return true
    })
  }

  scrollToBody (event) {
    !this.didScroll && this.refs.scroller.scrollTo({x: 0, y: event.nativeEvent.layout.y, animated: false})
    this.didScroll = true
  }

  render () {
    return <ScrollView ref="scroller" containerStyle={[s.high()]} style={[s.wide(), bg.primary, s.marginTop(statusBarHeight)]}>
      <Search autoFocus={false} filterByTag={this.props.tagId}>
        <View onLayout={this.scrollToBody.bind(this)}>
          {!this.props.noTopBar && <TopBar />}

          <View style={[s.paddings(10)]}>
            {this.props.children}
          </View>
        </View>
      </Search>
    </ScrollView>
  }
}

export default observer(Container, {})
