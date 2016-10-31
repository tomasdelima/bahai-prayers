'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  TextInput,
} from 'react-native'

var Category = require('./category')
var NavBar   = require('./nav-bar')
var Loading  = require('./loading')
var DB       = require('../db')
var s        = require('./styles')

var Categories = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      loading: true,
      ds: ds,
      categories: ds.cloneWithRows([]),
    }
  },
  setCategories(categories) {
    if(categories) {
      this.setState({
        loading: false,
        categories: this.state.ds.cloneWithRows(categories),
      })
    }
  },
  error(error) {
    console.log('Something went wrong: ' + error)
  },
  componentDidMount() {
    global.db.loadFromDB('categories', {active: [true]}, 'title').then(this.setCategories).catch(this.error)
    global.db.loadFromRemoteServer(this.props.remoteHost + '/categories.json', 'categories').then(this.setCategories).catch(this.error)
    global.db.loadFromRemoteServer(this.props.remoteHost + '/prayers.json', 'prayers').catch(this.error)
  },
  render() {
      // <NavBar label='Categorias' navigator={this.props.navigator} returnTo='categories' />
    if(this.state.loading) {
      return <Loading loading={this.state.loading}/>
    } else {
      return <ListView dataSource={this.state.categories} renderRow={(category) => <Category key={category.id} category={category} navigator={this.props.navigator} />} />
    }
  }
})

module.exports = Categories
