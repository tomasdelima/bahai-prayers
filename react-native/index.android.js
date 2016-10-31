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
var Loading    = require('./jsx/loading')
var LongPrayer = require('./jsx/long-prayer')

var List    = require('./jsx/list')

var remoteHost = 'http://bahai-prayers-server.herokuapp.com'
// var remoteHost = 'http://localhost:3000'

var RootNavigator = React.createClass({
  getInitialState() {
    return {loading: true}
  },
  componentDidMount () {
    setTimeout(() => { this.setState({loading: false}) }, 1000)
  },
  finishLoading () {
    this.setState({finishedLoading: true})
  },
  render () {
    if(!this.state.finishedLoading) {
      return <Loading loading={this.state.loading} finishLoading={this.finishLoading}/>
    } else {
      return <List/>
      return <Navigator
        initialRoute={{id: 'categories', name: 'Categories'}}
        renderScene={this.renderScene}
      />
    }
  },
  renderScene (route, navigator) {
         if(route.id == 'categories')  { return <Categories navigator={navigator} remoteHost={remoteHost} /> }
    else if(route.id == 'prayers')     { return <Prayers    navigator={navigator} remoteHost={remoteHost} categoryId={route.categoryId} /> }
    else if(route.id == 'long-prayer') { return <LongPrayer navigator={navigator} remoteHost={remoteHost} prayer={route.prayer} /> }
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

AppRegistry.registerComponent('BahaiPrayers', () => {return RootNavigator})
