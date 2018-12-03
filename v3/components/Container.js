import React from 'react'

class Container extends React.Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', function() {
      store.route = { goBack: true }
      return true
    })
  }

  scrollToBody (event) {
    // !this.didScroll && this.refs.scroller.scrollTo({x: 0, y: event.nativeEvent.layout.y, animated: false})
    // this.didScroll = true
  }

  renderBody () {
    return <View onLayout={this.scrollToBody.bind(this)}>
      {!this.props.noTopBar && <TopBar />}

      <View style={this.props.containerStyle}>
        {this.props.children}
      </View>
    </View>
  }

  renderSearchAndBody () {
    return <Search autoFocus={false} filterByTag={this.props.tagId}>{this.renderBody()}</Search>
  }

  render () {
    return !store.loading && <ScrollView ref="scroller" keyboardShouldPersistTaps="always" containerStyle={[s.high()]} style={[s.wide(), t.bg1, s.padding(10), s.paddingTop(statusBarHeight + 10)]}>
      {this.props.noSearch ? this.renderBody() : this.renderSearchAndBody()}
    </ScrollView>
  }
}

export default observer(Container, {})
