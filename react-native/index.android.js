'use strict'

import React, {Component} from 'react'
import {
  AppRegistry,
  // NavigatorIOS,
  Navigator,
} from 'react-native'

var Categories = require('./jsx/categories')
var Prayers    = require('./jsx/prayers')

var RootNavigator = React.createClass({
  render () {
    return <Navigator
      initialRoute={{id: 'categories', name: 'Categories'}}
      renderScene={this.renderScene}
    />
  },
  renderScene (route, navigator) {
    if(route.id == 'categories') { return <Categories navigator={navigator} /> }
    if(route.id == 'prayers')    { return <Prayers    navigator={navigator} /> }
  }
})

AppRegistry.registerComponent('BahaiPrayers', function() { return RootNavigator });
