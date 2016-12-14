'use strict'

import React, {Component} from 'react'
import {
  View,
  Navigator,
  ListView,
  AsyncStorage,
  Text,
} from 'react-native'

const Grid = require('./grid')
const Data = require('./data')
const s    = require('../styles')
const t    = require('../themes')

module.exports = React.createClass({
  componentDidMount() {
    this.goToYear(173)
    global.navigation = {
      goToYear: this.goToYear,
      goToMonth: this.goToMonth,
    }
  },
  goToYear (year) {
    global.navigator.calendar.push({id: 'year', items: Data.groupedYear(year)})
  },
  goToMonth (year, month) {
    global.navigator.calendar.push({id: 'month', items: Data.groupedMonth(year, month)})
  },
  render () {
    return <Navigator
      initialRoute={{id: 'root'}}
      renderScene={this.renderScene}
      configureScene={(route) => { return Navigator.SceneConfigs.FadeAndroid }}
    />
  },
  renderScene (route, navigator) {
    global.navigator.calendar = navigator

         if (route.id == 'root')  { return null }
    else if (route.id == 'year')  { return <Grid type={'year'}  items={route.items} theme={this.props.theme}/> }
    else if (route.id == 'month') { return <Grid type={'month'} items={route.items} theme={this.props.theme}/> }
    else { return <Text>NO ROUTE FOUND!</Text>}
  }
})
