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
      categoryId: this.props.category.id,
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
    fontSize: 20,
    margin: 30,
  }
})

module.exports = Category;
