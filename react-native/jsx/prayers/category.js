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

var s = require('../styles')
var t = require('../themes')

module.exports = React.createClass({
  render () {
    return <Text style={[s.item, s.paddingV, t[this.props.theme].text]}>{this.props.item.title}</Text>
  },
})

