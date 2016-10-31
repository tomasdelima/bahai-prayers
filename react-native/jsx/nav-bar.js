'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

var Category = require('./category')
var s = require('./styles')

var NavBar = React.createClass({
  goTo () {
    if (this.props.returnTo == 'category') {
      this.props.navigator.push({
        id: 'category',
        name: 'Category',
        categoryId: this.props.categoryId,
      })
    } else if (this.props.returnTo == 'categories') {
      this.props.navigator.push({
        id: 'categories',
        name: 'Categories',
      })
    }
  },
  render () {
    return <View style={s.navBar}>
      <Text style={s.navBarLeft} onPress={this.goTo}>Back</Text>
      <Text style={s.navBarCenter}>{this.props.label}</Text>
      <Text style={s.navBarRight}></Text>
    </View>
  }
})

module.exports = NavBar;
