'use strict'

import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  AppRegistry,
  // NavigatorIOS,
  Navigator,
} from 'react-native'

var NavBar     = require('./jsx/nav-bar')
var Categories = require('./jsx/categories')
var Prayers    = require('./jsx/prayers')

var remoteHost = 'http://bahai-prayers-server.herokuapp.com'
// var remoteHost = 'http://localhost:3000'

var RootNavigator = React.createClass({
  render () {
    return <Navigator
      initialRoute={{id: 'categories', name: 'Categories'}}
      renderScene={this.renderScene}
    />
  },
  renderScene (route, navigator) {
         if(route.id == 'categories') { return <Categories navigator={navigator} remoteHost={remoteHost} /> }
    else if(route.id == 'prayers')    { return <Prayers    navigator={navigator} remoteHost={remoteHost} categoryId={route.categoryId} /> }
    else { return <Text>NO ROUTE FOUND!</Text>}
  }
})

var styles = StyleSheet.create({
  container: {
  },
  header: {
    fontSize: 30
  },
})

AppRegistry.registerComponent('BahaiPrayers', function() { return RootNavigator });
