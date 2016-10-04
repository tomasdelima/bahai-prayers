'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

var Category = require('./category')

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
    return <View style={styles.container}>
      <Text style={styles.leftText} onPress={this.goTo}>Back</Text>
      <Text style={styles.centralText}>Nav Bar</Text>
    </View>
  }
})

var styles = StyleSheet.create({
  container: {
    height: 100,
    // border: 1,
    // borderColor: 'red',
    backgroundColor: '#ccc',
  },
  leftText: {
    paddingTop: 5,
    textAlign: 'left',
    fontSize: 26,
    width: 100,
    // display: 'inline-block',
  },
  centralText: {
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 26,
  },
})

module.exports = NavBar;
