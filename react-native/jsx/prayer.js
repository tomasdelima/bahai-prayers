'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

var Prayer = React.createClass({
  render () {
    return <Text style={styles.prayer}>{this.props.prayer.body}</Text>
  },
})

var styles = StyleSheet.create({
  prayer: {
    margin: 20
  }
})

module.exports = Prayer;
