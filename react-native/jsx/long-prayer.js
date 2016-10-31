'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

var s = require('./styles')

var LongPrayer = React.createClass({
  render () {
    var paragraphs = this.props.prayer.body.split('<br><br>')
    return <View>
      {paragraphs.map((paragraph, i) => <Text key={i} style={s.prayer}>{paragraph}</Text>)}
    </View>
  },
})

module.exports = LongPrayer
