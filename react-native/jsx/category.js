'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Dimensions,
  TextInput,
} from 'react-native'

var s = require('./styles')

module.exports = React.createClass({
  render () {
    return <Text style={[s.item, s.paddingV]}>{this.props.item.title}</Text>
  },
})

