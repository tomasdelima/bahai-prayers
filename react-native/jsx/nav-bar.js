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
  render() {
    return <View style={styles.navBar}>
      <Text>Nav Bar</Text>
    </View>
  }
})

var styles = StyleSheet.create({
  navBar: {
    height: 40,
  }
})

module.exports = NavBar;
