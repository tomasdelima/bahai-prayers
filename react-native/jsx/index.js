'use strict'

import React, {Component} from 'react'
import {
  View,
  Navigator,
  ListView,
  AsyncStorage,
  Text,
  AppRegistry,
} from 'react-native'

const SideMenu       = require('react-native-side-menu');
const Menu           = require('./menu')
const Configurations = require('./configurations')
const Loading        = require('./loading')
const Prayers        = require('./prayers')
const s              = require('./styles')
const t              = require('./themes')

const remoteHost = 'http://bahai-prayers-server.herokuapp.com'

module.exports = React.createClass({
  getInitialState() {
    return {
      theme: 'light',
      menuIsOpen: false,
      routes: [{id: 'prayers'}],
    }
  },
  componentDidMount() {
    t.getTheme(this)
  },
  componentDidUpdate(prevProps, prevState) {
  },
  reloadTheme () {
    t.getTheme(this)
  },
  closeMenu () {
    this.setState({menuIsOpen: false})
  },
  render () {
    return <View style={[s.high, s.wide, t[this.state.theme].background]}>
      <SideMenu menu={<Menu theme={this.state.theme} closeMenu={this.closeMenu}/>} isOpen={this.state.menuIsOpen}>
        <Navigator style={[t[this.state.theme].background]}
          initialRoute={this.state.routes[0]}
          initialRouteStack={this.state.routes}
          renderScene={this.renderScene}
          configureScene={(route) => { return Navigator.SceneConfigs.FadeAndroid }}
        />
      </SideMenu>
    </View>
  },
  renderScene (route, navigator) {
    global.navigator.root = navigator

         if (route.id == 'root')            { return null }
    else if (route.id == 'prayers')         { return <Prayers theme={this.state.theme}/> }
    else if (route.id == 'special-prayers') { return <Prayers theme={this.state.theme} specialPrayers={true}/> }
    else if (route.id == 'stared-prayers')  { return <Prayers theme={this.state.theme} staredPrayers={true}/> }
    else if (route.id == 'configurations')  { return <Configurations theme={this.state.theme} reloadTheme={this.reloadTheme}/> }
    else if (route.id == 'loading')         { return <Loading theme={this.state.theme}/> }
    else { return <Text>NO ROUTE FOUND!</Text>}
  }
})

