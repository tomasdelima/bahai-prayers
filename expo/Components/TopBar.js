@observer
class TopBar extends React.Component {
  goBack () {
    store.topBarLabels.pop()
    history.goBack()
  }

  componentDidMount () {
    BackHandler.addEventListener("hardwareBackPress", store.topBarLabels.pop)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener("hardwareBackPress", store.topBarLabels.pop)
  }

  resetLanguage () {
    history.push('/languages')
  }

  renderIcon (element, name, routes) {
    let self = { element }

    return <Flex shrink padding={10} onPress={() => history.push(routes[0])} style={s.borders([0, 0, 3], routes.filter(route => this.props.location.pathname.indexOf(route) >= 0).length ? theme[5] : theme[3])}>
      <self.element color={theme[2]} size={20} name={name} />
    </Flex>
  }

  render () {
    return <Flex stretch2 bg3 shrink>
      <Flex high={60} row shrink spacedIn>
        <Flex start2>
          {!!store.topBarLabels.length && <Flex paddingLeft={20} onPress={this.goBack} row start1>
            <FontAwesome5 color={theme[2]} size={20} name='chevron-left' />
            <Write color2 paddingLeft={10}>{store.topBarLabel}</Write>
          </Flex>}
        </Flex>

        <Flex shrink>
          <Flex onPress={this.resetLanguage} square={60}>
            <Image source={require('../Images/TranslateIcon.png')} style={s.high(50)} resizeMode='contain' />
          </Flex>
        </Flex>
      </Flex>

      <Flex row shrink spacedOut end2>
        {this.renderIcon(FontAwesome5, 'praying-hands', ['/tags', '/prayers', '/prayer'])}
        {this.renderIcon(FontAwesome, 'star', ['/starred'])}
        {this.renderIcon(MaterialIcons, 'date-range', ['/calendar'])}
        {this.renderIcon(MaterialCommunityIcons, 'gesture-double-tap', ['/95-taps'])}
      </Flex>
    </Flex>
  }
}

export default withRouter(TopBar)
