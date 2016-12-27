'use strict'

import React, {Component} from 'react'
import {
  View,
  Navigator,
  ListView,
  AsyncStorage,
  Text,
  AppRegistry,
  BackAndroid,
} from 'react-native'

const SideMenu          = require('react-native-side-menu');
const Menu              = require('./menu')
const Configurations    = require('./configurations')
const Loading           = require('./loading')
const Prayers           = require('./prayers/prayers')
const Calendar          = require('./calendar/calendar')
const AllahUAbhaCounter = require('./allah-u-abha-counter')
const s                 = require('./styles')
const t                 = require('./themes')

const remoteHost = 'http://bahai-prayers-server.herokuapp.com'

module.exports = React.createClass({
  getInitialState() {
    return {
      theme: 'light',
      menuIsOpen: false,
      initialRoute: {id: 'prayers'},
    }
  },
  componentDidMount() {
    t.getTheme(this)

    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.menuIsOpen) {
        this.setState({menuIsOpen: false})
        return false
      } else {
        var routes = global.navigator.root.getCurrentRoutes()
        var lastRoute = routes[routes.length - 1].id

        if (lastRoute == 'prayers') {
          var prayerRoutes = global.navigator.prayers.getCurrentRoutes()
          var lastPrayerRoute = prayerRoutes[prayerRoutes.length - 1].id

          if (lastPrayerRoute == 'categories') {
            return false
          } else {
            global.navigator.prayers.pop()
          }
        } else if (lastRoute == 'calendar') {
          var calendarRoutes = global.navigator.calendar.getCurrentRoutes()
          var lastCalendarRoute = calendarRoutes[calendarRoutes.length - 1].id

          if (lastCalendarRoute == 'year') {
            return false
          } else {
            global.navigator.calendar.pop()
          }
        } else {
          global.navigator.root.pop()
        }
        return true
      }
    })
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
          initialRoute={this.state.initialRoute}
          renderScene={this.renderScene}
          configureScene={(route) => { return Navigator.SceneConfigs.FadeAndroid }}
        />
      </SideMenu>
    </View>
  },
  renderScene (route, navigator) {
    global.navigator.root = navigator

         if (route.id == 'root')                 { return null }
    else if (route.id == 'prayers')              { return <Prayers theme={this.state.theme} reloadTheme={this.reloadTheme} /> }
    else if (route.id == 'special-prayers')      { return <Prayers theme={this.state.theme} reloadTheme={this.reloadTheme}  specialPrayers={true}/> }
    else if (route.id == 'stared-prayers')       { return <Prayers theme={this.state.theme} reloadTheme={this.reloadTheme}  staredPrayers={true}/> }
    else if (route.id == 'calendar')             { return <Calendar theme={this.state.theme}/> }
    else if (route.id == 'allah-u-abha-counter') { return <AllahUAbhaCounter theme={this.state.theme}/> }
    else if (route.id == 'configurations')       { return <Configurations theme={this.state.theme} reloadTheme={this.reloadTheme}/> }
    else if (route.id == 'loading')              { return <Loading theme={this.state.theme}/> }
    else { return <Text>NO ROUTE FOUND!</Text>}
  }
})

