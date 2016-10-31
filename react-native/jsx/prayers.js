'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native'

var Prayer  = require('./prayer')
var NavBar  = require('./nav-bar')
var Loading = require('./loading')
var s       = require('./styles')

var Prayers = React.createClass({
  getInitialState() {
    return {
      loading: true,
      category: {},
      prayers: [{body: 'Carregando',id: 0}],
    }
  },
  setPrayers(prayers) {
    if(prayers) {
      this.setState({
        loading: false,
        prayers: prayers,
      })
    }
  },
  setCategory(categories) {
    if(categories) {
      this.setState({category: categories[0]})
    }
  },
  componentDidMount() {
    global.db.loadFromDB('categories', {id: [this.props.categoryId]}).then(this.setCategory).catch(this.error)
    global.db.loadFromDB('prayers', {category_id: [this.props.categoryId], active: [true]}, 'author').then(this.setPrayers).catch(this.error)
  },
  render () {
    if(this.state.loading) {
      return <Loading style={{display: 'none'}}/>
    } else {
      return <View style={s.empty}>
        <NavBar label={this.state.category.title} navigator={this.props.navigator} returnTo='categories' />
        {this.state.prayers.map(prayer => <Prayer key={prayer.id} prayer={prayer} navigator={this.props.navigator}/> )}
      </View>
    }
  },
})

module.exports = Prayers
