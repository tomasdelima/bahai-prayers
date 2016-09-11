'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

var Category = React.createClass({
  goToPrayers () {
    this.props.navigator.push({
      id: 'prayers',
      name: 'Prayers',
    })
  },
  render () {
    return <Text style={styles.category} onPress={this.goToPrayers}>
      {this.props.category.title}
    </Text>
  }
})

var styles = StyleSheet.create({
  category: {
    margin: 30
  },
})

module.exports = Category;
