'use strict'

import React, {Component} from 'react'
import {
  View,
  Navigator,
  ListView,
  Text,
  AppRegistry,
} from 'react-native'

const SideMenu       = require('react-native-side-menu');
const Menu           = require('./menu')
const Configurations = require('./configurations')
const Prayers        = require('./prayers')
const s              = require('./styles')

const remoteHost = 'http://bahai-prayers-server.herokuapp.com'

module.exports = React.createClass({
  getInitialState() {
    return {
      routes: [{id: 'prayers'}],
    }
  },
  render () {
    return <SideMenu menu={<Menu/>} isOpen={false}>
      <Navigator style={s.white}
        initialRoute={this.state.routes[0]}
        initialRouteStack={this.state.routes}
        renderScene={this.renderScene}
        configureScene={(route) => { return Navigator.SceneConfigs.FadeAndroid }}
      />
    </SideMenu>
  },
  renderScene (route, navigator) {
    global.navigator.root = navigator

         if (route.id == 'root')           { return null }
    else if (route.id == 'prayers')        { return <Prayers/> }
    else if (route.id == 'configurations') { return <Configurations/> }
    else { return <Text>NO ROUTE FOUND!</Text>}
  }
})

