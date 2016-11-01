'use strict'

import React, {Component} from 'react'
import {
  View,
  Navigator,
  ListView,
  Text,
  AppRegistry,
} from 'react-native'

var DB         = require('../db')
var Loading    = require('./loading')
var List       = require('./list')
var LongPrayer = require('./long-prayer')
var s          = require('./styles')

var remoteHost = 'http://bahai-prayers-server.herokuapp.com'

module.exports = React.createClass({
  getInitialState() {
    return {
      routes: [{id: 'root'}],
    }
  },
  setItems(items, type) {
    global.navigator.push({id: 'loading'})

    if(items) {
      global.navigator.push({id: type, items: items})
    }
  },
  goToCategories () {
    global.db.loadFromDB('categories', {active: [true]}, 'title').then((categories) => {
      if (categories.length > 0) {
        this.setItems(categories, 'categories')
      } else {
        global.db.loadFromRemoteServer(remoteHost + '/categories.json', 'categories').then((categories) => {
          global.db.loadFromRemoteServer(remoteHost + '/prayers.json', 'prayers').then(() => {
            this.setItems(categories, 'categories')
          }).catch(this.error)
        }).catch(this.error)
      }
    }).catch(this.error)
  },
  error (error) { console.log('ERROR: ' + error) },
  goToCategory (categoryId) {
    global.db.loadFromDB('prayers', {category_id: [categoryId], active: [true]}, 'author').then((prayers) => {
      this.setItems(prayers, 'prayers')
    }).catch(this.error)
  },
  goToPrayer (prayer) {
    global.navigator.push({id: 'prayer', prayer: prayer})
  },
  componentDidMount () {
    global.navigation = {
      goToCategories: this.goToCategories,
      goToCategory: this.goToCategory,
      goToPrayer: this.goToPrayer,
    }
    this.goToCategories()
    global.db.loadFromRemoteServer(remoteHost + '/categories.json', 'categories').catch(this.error)
    global.db.loadFromRemoteServer(remoteHost + '/prayers.json', 'prayers').catch(this.error)
  },
  render () {
    return <Navigator
      initialRoute={this.state.routes[0]}
      initialRouteStack={this.state.routes}
      renderScene={this.renderScene}
      configureScene={(route) => { return Navigator.SceneConfigs.FadeAndroid }}
    />
  },
  renderScene (route, navigator) {
    global.navigator = navigator
         if (route.id == 'root')       { return null }
    else if (route.id == 'loading')    { return <Loading/> }
    else if (route.id == 'categories') { return <List items={route.items} type={'categories'}/> }
    else if (route.id == 'prayers')    { return <List items={route.items} type={'prayers'}   /> }
    else if (route.id == 'prayer')     { return <LongPrayer prayer={route.prayer}/> }
    else { return <Text>NO ROUTE FOUND!</Text>}
  }
})

