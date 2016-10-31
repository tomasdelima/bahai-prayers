'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

var s = require('./styles')

var Category = React.createClass({
  goToPrayers () {
    this.props.navigator.push({
      id: 'prayers',
      name: 'Prayers',
      categoryId: this.props.category.id,
    })
  },
  render () {
    return <Text style={s.category} onPress={this.goToPrayers}>
      {this.props.category.title}
    </Text>
  }
})

module.exports = Category;
