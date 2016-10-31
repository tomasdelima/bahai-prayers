'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

var LongPrayer = require('./long-prayer')
var s          = require('./styles')

var Prayer = React.createClass({
  goToLongPrayer () {
    this.props.navigator.push({
      id: 'long-prayer',
      name: 'Prayer',
      prayer: this.props.prayer,
    })
  },
  render () {
    return <Text style={s.prayer} onPress={this.goToLongPrayer}>{this.props.prayer.body.slice(0, 30)}</Text>
  },
})

module.exports = Prayer
