'use strict'

import React, {Component} from 'react'
import {
  View,
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
      loading: true,
      type: '',
      items: [],
      navigation: {
        goToCategories: this.goToCategories,
        goToCategory: this.goToCategory,
        goToPrayer: this.goToPrayer,
      },
    }
  },
  setItems(items, type) {
    if(items) {
      this.setState({
        loading: false,
        items: items,
        type: type,
      })
    }
  },
  startLoading () {
    this.setState({loading: true, finishedLoading: false})
  },
  goToCategories () {
    this.startLoading()
    global.db.loadFromDB('categories', {active: [true]}, 'title').then((categries) => {
      this.setItems(categries, 'categories')
    }).catch(this.error)
  },
  goToCategory (categoryId) {
    this.startLoading()
    global.db.loadFromDB('prayers', {category_id: [categoryId], active: [true]}, 'author').then((prayers) => {
      this.setItems(prayers, 'prayers')
    }).catch(this.error)
  },
  goToPrayer (prayer) {
    this.setState({prayer: prayer, type: 'prayer'})
  },
  componentDidMount () {
    this.goToCategories()
    global.db.loadFromRemoteServer(remoteHost + '/categories.json', 'categories').catch(this.error)
    global.db.loadFromRemoteServer(remoteHost + '/prayers.json', 'prayers').catch(this.error)
  },
  finishLoading () {
    this.setState({finishedLoading: true})
  },
  render () {
    if(!this.state.finishedLoading) {
      return <Loading loading={this.state.loading} finishLoading={this.finishLoading}/>
    } else if (this.state.type == 'categories' || this.state.type == 'prayers') {
      return <List items={this.state.items} type={this.state.type} navigation={this.state.navigation}/>
    } else if (this.state.type == 'prayer') {
      return <LongPrayer prayer={this.state.prayer} navigation={this.state.navigation}/>
    }
  },
})
